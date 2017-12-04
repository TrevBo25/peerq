CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    question TEXT,
    status VARCHAR(20),
    mentor VARCHAR
)