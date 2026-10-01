from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from bson.errors import InvalidId
from database import get_db

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"])


# ── Helper ───────────────────────────────────────────────────────────────────

def serialize(doc):
    """Convert MongoDB document to JSON-serialisable dict."""
    if doc is None:
        return None
    doc["id"] = str(doc.pop("_id"))
    # Convert any nested ObjectId fields
    for key, val in doc.items():
        if isinstance(val, ObjectId):
            doc[key] = str(val)
    return doc


def serialize_many(cursor):
    return [serialize(doc) for doc in cursor]


# ── Health ───────────────────────────────────────────────────────────────────

@app.route("/api/health")
def health():
    try:
        get_db().command("ping")
        return jsonify({"status": "ok", "database": "MongoDB", "version": "1.0.0"})
    except Exception as e:
        return jsonify({"status": "error", "detail": str(e)}), 500


# ── News Articles ────────────────────────────────────────────────────────────

@app.route("/api/news", methods=["GET"])
def get_news():
    db = get_db()
    category = request.args.get("category")
    sort_by = request.args.get("sort")
    limit = int(request.args.get("limit", 50))

    query = {}
    if category:
        query["category"] = category

    sort_field = "trend_score" if sort_by == "trending" else "published_at"
    cursor = db.news_articles.find(query).sort(sort_field, -1).limit(limit)
    return jsonify(serialize_many(cursor))


@app.route("/api/news/<article_id>", methods=["GET"])
def get_article(article_id):
    db = get_db()
    try:
        doc = db.news_articles.find_one({"_id": ObjectId(article_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400

    if doc:
        return jsonify(serialize(doc))
    return jsonify({"error": "Not found"}), 404


@app.route("/api/news", methods=["POST"])
def create_article():
    db = get_db()
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "title is required"}), 400

    from datetime import datetime
    data.setdefault("trend_score", 0)
    data.setdefault("priority", "Low")
    data.setdefault("is_duplicate", False)
    data.setdefault("status", "Indexed")
    data.setdefault("published_at", datetime.utcnow())
    data.setdefault("engagement", {"likes": 0, "shares": 0, "comments": 0})
    data.setdefault("tags", [])

    result = db.news_articles.insert_one(data)
    doc = db.news_articles.find_one({"_id": result.inserted_id})
    return jsonify(serialize(doc)), 201


@app.route("/api/news/<article_id>", methods=["DELETE"])
def delete_article(article_id):
    db = get_db()
    try:
        result = db.news_articles.delete_one({"_id": ObjectId(article_id)})
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400

    if result.deleted_count:
        return jsonify({"success": True})
    return jsonify({"error": "Not found"}), 404


# ── Social Posts ─────────────────────────────────────────────────────────────

@app.route("/api/social", methods=["GET"])
def get_social_posts():
    db = get_db()
    platform = request.args.get("platform")
    limit = int(request.args.get("limit", 50))

    query = {}
    if platform:
        query["platform"] = platform

    cursor = db.social_posts.find(query).sort("trend_score", -1).limit(limit)
    return jsonify(serialize_many(cursor))


@app.route("/api/social", methods=["POST"])
def create_social_post():
    db = get_db()
    data = request.get_json()
    if not data or not data.get("content"):
        return jsonify({"error": "content is required"}), 400

    from datetime import datetime
    data.setdefault("trend_score", 0)
    data.setdefault("priority", "Low")
    data.setdefault("status", "Active")
    data.setdefault("created_at", datetime.utcnow())
    data.setdefault("engagement", {"likes": 0, "shares": 0, "comments": 0})
    data.setdefault("hashtags", [])

    result = db.social_posts.insert_one(data)
    doc = db.social_posts.find_one({"_id": result.inserted_id})
    return jsonify(serialize(doc)), 201


# ── Trending ─────────────────────────────────────────────────────────────────

@app.route("/api/trending", methods=["GET"])
def get_trending():
    db = get_db()
    limit = int(request.args.get("limit", 10))
    cursor = db.news_articles.find({"is_duplicate": False}).sort("trend_score", -1).limit(limit)
    return jsonify(serialize_many(cursor))


# ── Duplicates ───────────────────────────────────────────────────────────────

@app.route("/api/duplicates", methods=["GET"])
def get_duplicates():
    db = get_db()
    cursor = db.news_articles.find({"is_duplicate": True}).sort("similarity_score", -1)
    return jsonify(serialize_many(cursor))


# ── Search ───────────────────────────────────────────────────────────────────

@app.route("/api/search", methods=["GET"])
def search():
    db = get_db()
    q = request.args.get("q", "").strip()
    if not q:
        return jsonify({"news": [], "social": []})

    import re
    pattern = re.compile(re.escape(q), re.IGNORECASE)

    news_cursor = db.news_articles.find(
        {"$or": [{"title": pattern}, {"content": pattern}, {"tags": pattern}]}
    ).limit(20)

    social_cursor = db.social_posts.find(
        {"$or": [{"content": pattern}, {"hashtags": pattern}, {"author": pattern}]}
    ).limit(20)

    return jsonify({
        "news": serialize_many(news_cursor),
        "social": serialize_many(social_cursor),
    })


# ── Analytics ────────────────────────────────────────────────────────────────

@app.route("/api/analytics", methods=["GET"])
def get_analytics():
    db = get_db()

    total_articles = db.news_articles.count_documents({})
    total_social = db.social_posts.count_documents({})
    duplicate_count = db.news_articles.count_documents({"is_duplicate": True})
    duplicate_rate = round((duplicate_count / total_articles * 100), 1) if total_articles else 0

    # Category breakdown
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    categories = [{"category": r["_id"], "count": r["count"]}
                  for r in db.news_articles.aggregate(pipeline)]

    # Platform breakdown
    pipeline2 = [
        {"$group": {"_id": "$platform", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    platforms = [{"platform": r["_id"], "count": r["count"]}
                 for r in db.social_posts.aggregate(pipeline2)]

    # Average trend score
    pipeline3 = [{"$group": {"_id": None, "avg": {"$avg": "$trend_score"}}}]
    avg_result = list(db.news_articles.aggregate(pipeline3))
    avg_trend = round(avg_result[0]["avg"], 1) if avg_result else 0

    return jsonify({
        "total_articles": total_articles,
        "total_social_posts": total_social,
        "duplicate_count": duplicate_count,
        "duplicate_rate": duplicate_rate,
        "avg_trend_score": avg_trend,
        "categories": categories,
        "platforms": platforms,
    })


# ── Moderation ───────────────────────────────────────────────────────────────

@app.route("/api/moderation", methods=["GET"])
def get_moderation():
    db = get_db()
    status_filter = request.args.get("status")
    query = {}
    if status_filter:
        query["status"] = status_filter

    cursor = db.moderation_queue.find(query).sort("reported_at", -1)
    return jsonify(serialize_many(cursor))


@app.route("/api/moderation/<item_id>/approve", methods=["POST"])
def approve_item(item_id):
    db = get_db()
    from datetime import datetime
    try:
        result = db.moderation_queue.find_one_and_update(
            {"_id": ObjectId(item_id)},
            {"$set": {"status": "Approved", "reviewed_at": datetime.utcnow()}},
            return_document=True,
        )
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400

    if result:
        return jsonify({"success": True, "item": serialize(result)})
    return jsonify({"error": "Not found"}), 404


@app.route("/api/moderation/<item_id>/reject", methods=["POST"])
def reject_item(item_id):
    db = get_db()
    from datetime import datetime
    try:
        result = db.moderation_queue.find_one_and_update(
            {"_id": ObjectId(item_id)},
            {"$set": {"status": "Rejected", "reviewed_at": datetime.utcnow()}},
            return_document=True,
        )
    except InvalidId:
        return jsonify({"error": "Invalid ID format"}), 400

    if result:
        return jsonify({"success": True, "item": serialize(result)})
    return jsonify({"error": "Not found"}), 404


# ── Entry Point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("🚀 NewsIQ backend starting — connecting to MongoDB...")
    app.run(debug=True, port=5000)
