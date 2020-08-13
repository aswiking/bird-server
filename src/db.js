import pg from 'pg';

const connectionString = 'postgresql://localhost/birdbase';

const pool = new pg.Pool({
    connectionString
});

export default pool;