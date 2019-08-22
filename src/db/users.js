const b64 = require('base-64');
const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) { // @TODO realizar este tratamento no front
    return res.send(400, { error: "Dados incompletos!" });
  }
  try {
    const client = await pool.connect()
    const result = await client.query(
      `SELECT id FROM users WHERE email = '${email}' AND password = '${b64.encode(password)}';`
    );
    client.release();
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

routes.get("/:id", async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM users WHERE id = ${req.params.id};`
    );
    client.release();
    return res.json(result.rows);
  } catch (err) {
    return res.send("Error " + err);
  }
})

routes.get("/", async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(`SELECT * FROM users;`
    );
    client.release();
    return res.json(result.rows);
  } catch (err) {
    return res.send("Error " + err);
  }
})

routes.post("/", async (req, res) => {
  const { email, password, name, phone, birthdate } = req.body;
  if (!email || !password || !name) { // @TODO realizar este tratamento no front
    return res.send(400, { error: "Dados incompletos!" });
  }
  try {
    const client = await pool.connect()
    await client.query(
      `INSERT INTO users (email, password, name, phone, birthdate) VALUES (
      '${email}', '${b64.encode(password)}', '${name}', '${phone}', '${birthdate}'
      );`
    );
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.send("Error " + err);
  }
})

routes.put("/:id", async (req, res) => {
  const { columns } = req.body;
  let allColumns = "";
  columns.forEach(({ column, value }) => {
    // console.log('test', column, value)
    allColumns ? 
      allColumns += `, ${column} = '${value}'` :
      allColumns += `${column} = '${value}'`
  });  
  try {
    const client = await pool.connect()
    await client.query(`UPDATE users SET ${allColumns} WHERE id = ${req.params.id};`);
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.send("Error " + err);
  }
})

routes.delete("/:id", async (req, res) => {
  try {
    const client = await pool.connect()
    await client.query(
      `DELETE FROM users WHERE id = ${req.params.id};`
    );
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.send("Error " + err);
  }
})
module.exports = routes;