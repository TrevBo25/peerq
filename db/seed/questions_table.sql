CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    question TEXT,
    status VARCHAR(20)
)