CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,  -- This column stores the bcrypt hashed password
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS memes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    used_in_game BOOLEAN
);

CREATE TABLE IF NOT EXISTS captions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caption_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meme_captions (
    id INTEGER,
    caption_id INTEGER,
    is_best_match BOOLEAN,
    FOREIGN KEY (meme_id) REFERENCES memes (meme_id),
    FOREIGN KEY (caption_id) REFERENCES captions (caption_1id),
    PRIMARY KEY (meme_id, caption_id)
);

CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player INTEGER,
    round1 TEXT,
    round2 TEXT,
    round3 TEXT,
    total_score INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT 0,
    --start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS rounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER,
    meme_id INTEGER,
    caption1 TEXT NOT NULL,
    caption2 TEXT NOT NULL,
    caption3 TEXT NOT NULL,
    caption4 TEXT NOT NULL,
    caption5 TEXT NOT NULL,
    caption6 TEXT NOT NULL,
    caption7 TEXT NOT NULL,
    answer INTEGER,
    score INTEGER DEFAULT 0,
    --selected_caption_id INTEGER,
    --round_number INTEGER,
    --FOREIGN KEY (game_id) REFERENCES games (game_id),
    --FOREIGN KEY (meme_id) REFERENCES memes (meme_id),
    --FOREIGN KEY (selected_caption_id) REFERENCES captions (caption_id)
);

CREATE TABLE IF NOT EXISTS round_captions (
    id INTEGER, 
    round_id INTEGER,
    caption_id INTEGER,
    --FOREIGN KEY (round_id) REFERENCES rounds (round_id),
    --FOREIGN KEY (caption_id) REFERENCES captions (caption_id),
    --PRIMARY KEY (round_id, caption_id)
);

-- MAKE USERS
INSERT OR IGNORE INTO users (user_id, username, hashed_password, email) VALUES (1, 'Rikke','password123', 'rikke@example.com');


-- INSERT MEMES
INSERT OR IGNORE INTO memes (meme_id, image_path, used_in_game) VALUES (1, '../client/assets/yes_boy.jpeg', 0);
-- INSERT CAPTIONS
INSERT OR IGNORE INTO captions (caption_id, caption_text) VALUES (1, 'When you finally finish a challenging level in a video game.');
INSERT OR IGNORE INTO captions (caption_id, caption_text) VALUES (2, 'When you ace the exam everyone said was impossible.');
INSERT OR IGNORE INTO captions (caption_id, caption_text) VALUES (3, 'When you realize you left your homework at home.');
INSERT OR IGNORE INTO captions (caption_id, caption_text) VALUES (4, 'When you get your favorite ice cream flavor.');
INSERT OR IGNORE INTO captions (caption_id, caption_text) VALUES (5, 'When your mom tells you to clean your room.');

