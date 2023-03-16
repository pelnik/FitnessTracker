const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

let client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  idleTimeoutMillis: 30000,
});

client.on('error', (e) => {
  console.error('Database error', e);
  client = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
    idleTimeoutMillis: 30000,
  });
});

console.log('the env', process.env.NODE_ENV);

module.exports = client;
