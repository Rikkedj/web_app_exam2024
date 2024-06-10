CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- This column stores the bcrypt hashed password
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS memes (
    meme_id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    used_in_game BOOLEAN
);

CREATE TABLE IF NOT EXISTS captions (
    caption_id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meme_captions (
    meme_id INTEGER,
    caption_id INTEGER,
    is_best_match BOOLEAN,
    FOREIGN KEY (meme_id) REFERENCES memes (meme_id),
    FOREIGN KEY (caption_id) REFERENCES captions (caption_id),
    PRIMARY KEY (meme_id, caption_id)
);

CREATE TABLE IF NOT EXISTS games (
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_score INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT 0,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS rounds (
    round_id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    meme_id INTEGER,
    selected_caption_id INTEGER,
    score INTEGER DEFAULT 0,
    round_number INTEGER,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games (game_id),
    FOREIGN KEY (meme_id) REFERENCES memes (meme_id),
    FOREIGN KEY (selected_caption_id) REFERENCES captions (caption_id)
);

CREATE TABLE IF NOT EXISTS round_captions (
    round_id INTEGER,
    caption_id INTEGER,
    FOREIGN KEY (round_id) REFERENCES rounds (round_id),
    FOREIGN KEY (caption_id) REFERENCES captions (caption_id),
    PRIMARY KEY (round_id, caption_id)
);
