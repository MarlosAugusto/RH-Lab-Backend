/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const b64 = require('base-64');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
   ssl: true,
});

const findAll = async (table) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table} ORDER BY id;`);
    // console.log(result);
    client.release();
    return JSON.stringify(result.rows);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const find = async (table, id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table} WHERE id = ${id};`);
    client.release();
    return res.json(result.rows);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const findWhere = async (table, where) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table} ${where} ORDER BY id;`);
    client.release();
    return res.json(result.rows);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
}

const create = async (data, table) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO ${table} ${data} RETURNING id;`,
    );
    client.release();
    // console.log('result:', result.rows[0].id)
    return JSON.stringify(result.rows[0].id);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const update = async (data, table, id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`UPDATE ${table} SET ${data} WHERE id = ${id};`);
    client.release();
    return JSON.stringify(result.rows[0]);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const destroy = async (table, id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM ${table} WHERE id = ${id};`,
    );
    client.release();
    return JSON.stringify(result);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

exports.create = create;
exports.find = find;
exports.findAll = findAll;
exports.findWhere = findWhere;
exports.update = update;
exports.destroy = destroy;
