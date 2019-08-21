const b64 = require('base-64');
const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || !name) { // @TODO realizar este tratamento no front
    return res.send(400, {error: "Dados incompletos!"});
  }
  try {
    const client = await pool.connect()
    const result = await client.query(
      `SELECT id FROM users WHERE email = "%${email}%" AND password = ${b64.encode(password)};`
    );
    client.release();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

routes.post("/save", async (req, res) => {
  const { email, password, name, phone, birthdate } = req.body;
  if (!email || !password || !name) { // @TODO realizar este tratamento no front
    return res.send(400, {error: "Dados incompletos!"});
  }
  try {
    const client = await pool.connect()
    const result = await client.query(
      `INSERT INTO users VALUES (${email}, ${b64.encode(password)}, ${name}, ${phone}, ${birthdate};`
    );
    client.release();
    return res.json(result);
  } catch (err) {
    return res.send("Error " + err);
  }
})

module.exports = routes;