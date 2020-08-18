INSERT INTO groups
    (id, name)
VALUES
    (1, 'Ducks, geese and swans'),
    (2, 'Grouse'),
    (3, 'Pheasants, partridges and quail');



INSERT INTO birds
    (id, common, scientific, group_id)
VALUES
    (1, 'Greater Canada goose', 'Branta canadensis', 1),
    (2, 'Greylag goose', 'Anser anser', 1),
    (3, 'Mute Swan', 'Cygnus olor', 1),
    (4, 'Red Grouse', 'Lagopus lagopus scotica', 2);


INSERT INTO sightings
    (bird_id, user_id, datetime, lat, lng, notes)
VALUES
    (1, 1, '2020-06-22', 52.617473, -1.077948, 'Shady Lane Arboretum');



INSERT INTO photos
    (id, sighting_id, instagram_media_id)
VALUES
    (1, 1, '101050178_277109030249242_4401003732908096273')



