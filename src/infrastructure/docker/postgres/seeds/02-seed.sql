INSERT INTO users (email) VALUES
    ('admin@anuj.com'),
    ('user@anuj.com')
ON CONFLICT (email) DO NOTHING;