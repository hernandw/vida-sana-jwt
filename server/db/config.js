const { Pool } = require("pg");
require("dotenv").config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  allowExitOnIdle: true,
});

const getData = async () => {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows[0]);
  return res.rows;
};

/* getData() */

module.exports = pool;
