CREATE TABLE birds
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    scientific TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE,
    image TEXT
);