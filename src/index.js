const express = require('express')
const { Client } = require('pg');

const app = express()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

app.post("/test", (req, res) => {
  console.log('teste')
  // client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  //   if (err) throw err;
  //   for (let row of res.rows) {
  //     console.log(JSON.stringify(row));
  //   }
  //   client.end();
  // });
  
  return res.json({ hello: "World" })
})
app.listen(process.env.PORT || 3000)