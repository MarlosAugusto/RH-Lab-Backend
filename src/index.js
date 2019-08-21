const express = require('express')
const { Pool } = require('pg');
const dotenv = require('dotenv')

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://rh-lab-frontend.marlosaugusto.now.sh/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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