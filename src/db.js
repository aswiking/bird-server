import pg from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/birdbase';

const pool = new pg.Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" ? {
        rejectUnauthorized: false
    } : undefined
});

export default pool;