-- Schema for NewsIQ Analytics Engine

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role TEXT DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS news_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    summary TEXT,
    source TEXT,
    category TEXT,
    published_at TIMESTAMP,
    trend_score INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'Low',
    engagement_likes INTEGER DEFAULT 0,
    engagement_shares INTEGER DEFAULT 0,
    engagement_comments INTEGER DEFAULT 0,
    hash TEXT,
    status TEXT DEFAULT 'Indexed',
    is_duplicate BOOLEAN DEFAULT FALSE,
    duplicate_of INTEGER,
    similarity_score INTEGER,
    tags TEXT, -- Stored as comma-separated
    related_ids TEXT -- Stored as comma-separated
);

CREATE TABLE IF NOT EXISTS social_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    content TEXT,
    author TEXT,
    handle TEXT,
    engagement_likes INTEGER DEFAULT 0,
    engagement_shares INTEGER DEFAULT 0,
    engagement_comments INTEGER DEFAULT 0,
    created_at TIMESTAMP,
    trend_score INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'Low',
    status TEXT DEFAULT 'Active',
    hashtags TEXT,
    sentiment TEXT,
    verified BOOLEAN DEFAULT FALSE,
    related_news_ids TEXT
);

CREATE TABLE IF NOT EXISTS relationships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_news_id INTEGER,
    related_news_id INTEGER,
    relationship_type TEXT,
    similarity_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(source_news_id) REFERENCES news_articles(id),
    FOREIGN KEY(related_news_id) REFERENCES news_articles(id)
);

CREATE TABLE IF NOT EXISTS moderation_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    post_type TEXT,
    content TEXT,
    author TEXT,
    platform TEXT,
    priority TEXT,
    reason TEXT,
    status TEXT DEFAULT 'Pending',
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_to INTEGER,
    reviewed_at TIMESTAMP,
    FOREIGN KEY(assigned_to) REFERENCES users(id)
);
