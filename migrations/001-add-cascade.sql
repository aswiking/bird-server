ALTER TABLE photos
DROP CONSTRAINT photos_sighting_id_fkey;

ALTER TABLE photos
ADD CONSTRAINT photos_sighting_id_fkey
    FOREIGN KEY (sighting_id) 
    REFERENCES sightings(id)
    ON DELETE CASCADE;