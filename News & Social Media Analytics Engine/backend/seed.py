"""
seed.py — Populate MongoDB with initial data for NewsIQ Analytics Engine.
Run once: python seed.py
"""
from datetime import datetime, timedelta
import random
from database import get_db

def seed():
    db = get_db()

    # ── Drop existing collections ────────────────────────────────────────────
    db.news_articles.drop()
    db.social_posts.drop()
    db.moderation_queue.drop()
    db.users.drop()
    print("Dropped existing collections.")

    # ── Users ────────────────────────────────────────────────────────────────
    users = [
        {"name": "Alice Admin", "email": "alice@newsiq.com", "username": "alice",
         "password_hash": "hashed_pw_1", "role": "admin",
         "created_at": datetime.utcnow()},
        {"name": "Bob Editor", "email": "bob@newsiq.com", "username": "bob",
         "password_hash": "hashed_pw_2", "role": "editor",
         "created_at": datetime.utcnow()},
    ]
    db.users.insert_many(users)
    print(f"Seeded {len(users)} users.")

    # ── News Articles ────────────────────────────────────────────────────────
    now = datetime.utcnow()
    articles = [
        {
            "title": "GPT-5 Expected to Launch Later This Year",
            "content": "OpenAI is reportedly preparing GPT-5 for release...",
            "summary": "OpenAI's next-generation model GPT-5 is expected to launch later this year.",
            "source": "TechCrunch",
            "category": "Technology",
            "published_at": now - timedelta(hours=2),
            "trend_score": 98,
            "priority": "High",
            "engagement": {"likes": 4200, "shares": 1800, "comments": 630},
            "hash": "abc123hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["AI", "GPT", "OpenAI"],
            "related_ids": [],
        },
        {
            "title": "Global Climate Summit Yields New Carbon Goals",
            "content": "World leaders agreed on ambitious new carbon reduction targets...",
            "summary": "A landmark climate agreement was signed at this year's summit.",
            "source": "BBC",
            "category": "Science",
            "published_at": now - timedelta(hours=5),
            "trend_score": 92,
            "priority": "High",
            "engagement": {"likes": 3100, "shares": 1400, "comments": 520},
            "hash": "def456hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["Climate", "Environment", "Summit"],
            "related_ids": [],
        },
        {
            "title": "Federal Reserve Holds Interest Rates Steady",
            "content": "The Fed opted to maintain current interest rates amid economic uncertainty...",
            "summary": "Federal Reserve keeps rates unchanged in latest meeting.",
            "source": "Reuters",
            "category": "Finance",
            "published_at": now - timedelta(hours=8),
            "trend_score": 87,
            "priority": "High",
            "engagement": {"likes": 2800, "shares": 900, "comments": 410},
            "hash": "ghi789hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["Finance", "Economy", "FederalReserve"],
            "related_ids": [],
        },
        {
            "title": "New Study Links Ultra-Processed Foods to Heart Disease",
            "content": "Researchers have found a strong correlation between ultra-processed food consumption and cardiovascular risk...",
            "summary": "Ultra-processed foods linked to significantly higher heart disease risk.",
            "source": "The Lancet",
            "category": "Health",
            "published_at": now - timedelta(hours=10),
            "trend_score": 81,
            "priority": "Medium",
            "engagement": {"likes": 1900, "shares": 750, "comments": 320},
            "hash": "jkl012hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["Health", "Nutrition", "Heart"],
            "related_ids": [],
        },
        {
            "title": "SpaceX Starship Completes Successful Orbital Test",
            "content": "SpaceX's Starship vehicle successfully completed its first full orbital flight...",
            "summary": "Starship reaches orbit for the first time in a major milestone for SpaceX.",
            "source": "Space.com",
            "category": "Science",
            "published_at": now - timedelta(hours=3),
            "trend_score": 95,
            "priority": "High",
            "engagement": {"likes": 5100, "shares": 2200, "comments": 870},
            "hash": "mno345hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["Space", "SpaceX", "Starship"],
            "related_ids": [],
        },
        {
            "title": "OpenAI announces GPT-5 release date",
            "content": "OpenAI has officially announced the release date for GPT-5...",
            "summary": "Duplicate story covering the GPT-5 announcement.",
            "source": "The Verge",
            "category": "Technology",
            "published_at": now - timedelta(hours=1),
            "trend_score": 85,
            "priority": "Medium",
            "engagement": {"likes": 1200, "shares": 400, "comments": 180},
            "hash": "pqr678hash_dup",
            "status": "Duplicate",
            "is_duplicate": True,
            "duplicate_of": "GPT-5 Expected to Launch Later This Year",
            "similarity_score": 94,
            "tags": ["AI", "GPT", "OpenAI"],
            "related_ids": [],
        },
        {
            "title": "Quantum Computing Breakthrough Achieved by IBM",
            "content": "IBM researchers have demonstrated a new qubit architecture...",
            "summary": "IBM achieves a milestone in fault-tolerant quantum computing.",
            "source": "Nature",
            "category": "Technology",
            "published_at": now - timedelta(hours=12),
            "trend_score": 76,
            "priority": "Medium",
            "engagement": {"likes": 1600, "shares": 600, "comments": 240},
            "hash": "stu901hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["QuantumComputing", "IBM", "Technology"],
            "related_ids": [],
        },
        {
            "title": "Major Cybersecurity Breach Exposes 50 Million Records",
            "content": "A large-scale data breach has been discovered affecting multiple organizations...",
            "summary": "50 million user records exposed in widespread cybersecurity attack.",
            "source": "Wired",
            "category": "Technology",
            "published_at": now - timedelta(hours=6),
            "trend_score": 89,
            "priority": "High",
            "engagement": {"likes": 3400, "shares": 1600, "comments": 720},
            "hash": "vwx234hash",
            "status": "Indexed",
            "is_duplicate": False,
            "duplicate_of": None,
            "similarity_score": None,
            "tags": ["Cybersecurity", "DataBreach", "Privacy"],
            "related_ids": [],
        },
    ]
    result = db.news_articles.insert_many(articles)
    print(f"Seeded {len(result.inserted_ids)} news articles.")

    # ── Social Posts ─────────────────────────────────────────────────────────
    social_posts = [
        {
            "platform": "Twitter",
            "content": "Can't wait for GPT-5! The AI revolution is here 🚀 #AI #Tech #GPT5",
            "author": "tech_guru",
            "handle": "@tech_guru",
            "engagement": {"likes": 892, "shares": 234, "comments": 67},
            "created_at": now - timedelta(minutes=45),
            "trend_score": 91,
            "priority": "High",
            "status": "Active",
            "hashtags": ["AI", "Tech", "GPT5"],
            "sentiment": "Positive",
            "verified": True,
            "related_news_ids": [],
        },
        {
            "platform": "Reddit",
            "content": "The climate deal is just more empty promises. Wake up people. #ClimateScam",
            "author": "skeptic_99",
            "handle": "u/skeptic_99",
            "engagement": {"likes": 1240, "shares": 89, "comments": 342},
            "created_at": now - timedelta(hours=1),
            "trend_score": 72,
            "priority": "Medium",
            "status": "Active",
            "hashtags": ["ClimateScam", "Politics"],
            "sentiment": "Negative",
            "verified": False,
            "related_news_ids": [],
        },
        {
            "platform": "Twitter",
            "content": "SpaceX just made history! 🌌 Humanity is becoming multiplanetary. #SpaceX #Starship",
            "author": "space_fan_42",
            "handle": "@space_fan_42",
            "engagement": {"likes": 5600, "shares": 2100, "comments": 430},
            "created_at": now - timedelta(minutes=20),
            "trend_score": 97,
            "priority": "High",
            "status": "Active",
            "hashtags": ["SpaceX", "Starship", "Space"],
            "sentiment": "Positive",
            "verified": False,
            "related_news_ids": [],
        },
        {
            "platform": "Instagram",
            "content": "Ultra-processed food is slowly killing us. Time to eat real food! 🥗 #HealthyEating",
            "author": "wellness_coach_maya",
            "handle": "@wellness_coach_maya",
            "engagement": {"likes": 3200, "shares": 980, "comments": 215},
            "created_at": now - timedelta(hours=3),
            "trend_score": 68,
            "priority": "Medium",
            "status": "Active",
            "hashtags": ["HealthyEating", "Nutrition", "Wellness"],
            "sentiment": "Neutral",
            "verified": True,
            "related_news_ids": [],
        },
        {
            "platform": "Twitter",
            "content": "Free crypto giveaway! Send 0.1 BTC and get 1 BTC back! Limited time! #Crypto #Bitcoin",
            "author": "crypto_scammer_bot",
            "handle": "@crypto_scammer_bot",
            "engagement": {"likes": 12, "shares": 5, "comments": 89},
            "created_at": now - timedelta(minutes=10),
            "trend_score": 5,
            "priority": "High",
            "status": "Flagged",
            "hashtags": ["Crypto", "Bitcoin"],
            "sentiment": "Spam",
            "verified": False,
            "related_news_ids": [],
        },
    ]
    result = db.social_posts.insert_many(social_posts)
    print(f"Seeded {len(result.inserted_ids)} social posts.")

    # ── Moderation Queue ─────────────────────────────────────────────────────
    moderation_items = [
        {
            "content": "Check out this free crypto giveaway! Send 0.1 BTC and get 1 BTC back!",
            "platform": "Twitter",
            "author": "crypto_scammer_bot",
            "priority": "High",
            "reason": "Spam / Scam",
            "status": "Pending",
            "reported_at": now - timedelta(minutes=10),
            "reviewed_at": None,
        },
        {
            "content": "The climate deal is just more empty promises. Wake up people. #ClimateScam",
            "platform": "Reddit",
            "author": "skeptic_99",
            "priority": "Medium",
            "reason": "Misinformation",
            "status": "Pending",
            "reported_at": now - timedelta(hours=1),
            "reviewed_at": None,
        },
        {
            "content": "BREAKING: Celebrity dies in car crash [FAKE NEWS LINK]",
            "platform": "Facebook",
            "author": "clickbait_king",
            "priority": "High",
            "reason": "Misinformation / Clickbait",
            "status": "Approved",
            "reported_at": now - timedelta(hours=4),
            "reviewed_at": now - timedelta(hours=3),
        },
    ]
    result = db.moderation_queue.insert_many(moderation_items)
    print(f"Seeded {len(result.inserted_ids)} moderation items.")

    # ── Indexes ──────────────────────────────────────────────────────────────
    db.news_articles.create_index("category")
    db.news_articles.create_index("trend_score")
    db.news_articles.create_index("is_duplicate")
    db.news_articles.create_index([("title", "text"), ("content", "text")])
    db.social_posts.create_index("platform")
    db.social_posts.create_index("trend_score")
    db.moderation_queue.create_index("status")
    print("Created indexes.")

    print("\n✅ MongoDB seeding complete! Database: newsiq")

if __name__ == "__main__":
    seed()
