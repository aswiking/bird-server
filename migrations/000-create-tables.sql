CREATE TABLE groups
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL, 
    scientific TEXT UNIQUE NOT NULL, 
);

CREATE TABLE birds
(
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(id),
    common TEXT NOT NULL,
    scientific TEXT NOT NULL
);

CREATE TABLE sightings
(
    id SERIAL PRIMARY KEY,
    bird_id INTEGER REFERENCES birds(id),
    user_id TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6),
    notes TEXT
);

CREATE TABLE photos
(
    id SERIAL PRIMARY KEY,
    sighting_id INTEGER REFERENCES sightings(id),
    instagram_media_id TEXT NOT NULL,
    permalink TEXT NOT NULL
);