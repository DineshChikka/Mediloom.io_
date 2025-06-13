import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;
dotenv.config();


// comment these credentials when prod
// console.log('PG_USER:', process.env.PG_USER);
// console.log('PG_HOST:', process.env.PG_HOST);
// console.log('PG_DATABASE:', process.env.PG_DATABASE);
// console.log('PG_PASSWORD:', process.env.PG_PASSWORD);
// console.log('PG_PORT:', process.env.PG_PORT);


const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export default pool;