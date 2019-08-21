
const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// criação das tabelas passando o nome da tabela e as colunas ( columns = [
// {"column": "id INT PRIMARY KEY SERIAL,"},
// {"column": "name VARCHAR(50),"},
// ])
routes.post("/createTable", async (req, res) => {
  const { table_name, columns } = req.body;
  if (!table_name || !columns) {
    return res.send(400, {error: "Dados incompletos!"});
  }
  let allColumns = "";
  columns.forEach(column => {
      allColumns += column;
  });
  const query = `CREATE TABLE ${table_name} (
    ${allColumns}
  );`
  try {
    const client = await pool.connect()
    const result = await client.query(query);
    client.release();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

module.exports = routes;