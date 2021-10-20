import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/birdbase';

const pool = new pg.Pool({
    connectionString
});

export default pool;