const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

routes.get("/", (req, res) => {
  return res.json({ hello: "World" })
});

// teste de conexão com o banco
routes.post("/test", async (req, res) => {
  let results;
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW();');
    results = { 'results': (result) ? result.rows : null };
    client.release();
    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

routes.use(require("./db/users"))

module.exports = routes;