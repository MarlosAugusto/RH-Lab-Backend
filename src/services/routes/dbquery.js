/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

routes.post('/', async (req, res) => {
  const query = `${req.body.query}`;
  console.log("query:", query)
  try {
    const client = await pool.connect();
    await client.query(query);
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.send(`Error ${err}`);
  }
});

module.exports = routes;
