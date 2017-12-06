UPDATE questions
SET status = 'helping', mentor = $2
WHERE id = $1;