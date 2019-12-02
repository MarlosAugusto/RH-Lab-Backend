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
  const query = req.body.query
  const key = req.body.key
  if (key === process.env.ACCESSKEY) {
    try {
      const client = await pool.connect();
      const result = await client.query(query);
      client.release();
      if (result.rows[0]) {
        return res.status(200).json(result.rows)
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.send(`Error ${err}`);
    }
  } else {
    return res.status(401).json({ Error: 'Você não possui autorização para realizar a operação.' });
  }
});

module.exports = routes;
