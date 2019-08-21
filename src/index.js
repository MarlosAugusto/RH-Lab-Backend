const express = require('express')
const { Pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.post("/test", async (req, res) => {
  console.log('url',process.env.DATABASE_URL)
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW();');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
  
  return res.json({ hello: "World" })
})
app.listen(process.env.PORT || 3000)