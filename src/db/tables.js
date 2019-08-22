
const routes = require('express').Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// criação das tabelas passando o nome da tabela e as colunas :
  // "table_name": "users",
	// "columns": [
	// 	"id SERIAL PRIMARY KEY",
	// 	"email VARCHAR(255) NOT NULL",
	// 	"password VARCHAR(50) NOT NULL",
	// 	"name VARCHAR(100) NOT NULL",
	// 	"phone VARCHAR(255)",
	// 	"birthdate VARCHAR(255)"
	// ]
routes.post("/", async (req, res) => {
  const { table_name, columns } = req.body;
  if (!table_name || !columns) {
    return res.send(400, {error: "Dados incompletos!"});
  }
  let allColumns = "";
  columns.forEach(column => {
      allColumns ? 
        allColumns += `, ${column}` :
        allColumns += `${column}`
  });
  const query = `CREATE TABLE ${table_name} (${allColumns});`;
  try {
    const client = await pool.connect()
    await client.query(query);
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

routes.delete("/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const client = await pool.connect()
    await client.query(`DROP TABLE ${name};`);
    client.release();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
} )
module.exports = routes;