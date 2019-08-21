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
  let results;
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW();');
    results = { 'results': (result) ? result.rows : null};
    client.release();
    return res.send("results: " + JSON.stringify(results));
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }  
})
app.listen(process.env.PORT || 3000)