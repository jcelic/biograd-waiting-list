import pg from 'pg';
import env from 'dotenv';

env.config();

if (
  !process.env.PG_USER ||
  !process.env.PG_HOST ||
  !process.env.PG_DATABASE ||
  !process.env.PG_PORT ||
  !process.env.PG_PASSWORD
) {
  console.error('Missing one or more environment variables');
  process.exit(1);
}

const isProductionDb =
  process.env.PG_HOST && !process.env.PG_HOST.includes('localhost');

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: isProductionDb ? { rejectUnauthorized: false } : false,
});

db.query('SELECT 1')
  .then(() => console.log('Connected to database'))
  .catch((error) => {
    console.error('Could not connect to database', error);
    process.exit(1);
  });

db.on('error', (error) => {
  console.error('Unexpected database error', error);
  process.exit(1);
});

export const query = (text, params) => db.query(text, params);
