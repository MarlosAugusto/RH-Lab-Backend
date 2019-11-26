/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require('base-64');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const findAll = async (table) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table} ORDER BY id;`);
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
    return JSON.stringify(result.rows);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const findWhere = async (table, where) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${table} ${where} ORDER BY id;`);
    client.release();
    return JSON.stringify(result.rows);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
}

const create = async (data, table) => {
  try {
    const client = await pool.connect();
    const columns = Object.keys(data).toString()
    let values = ''
    Object.values(data).map(dt => {
      values
        ? values += `, ${typeof dt === 'number' ? dt : `'${dt}'`}`
        : values += `${typeof dt === 'number' ? dt : `'${dt}'`}`;
    });
    const result = await client.query(
      `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING id;`,
    );
    client.release();
    return JSON.stringify(result.rows[0].id);
  } catch (err) {
    return JSON.stringify(`Error ${err}`);
  }
};

const update = async (data, table, id) => {
  try {
    const client = await pool.connect();
    let allColumns = ''
    Object.entries(data).forEach((dt) => {
      allColumns
        ? allColumns += `, ${dt[0]} = ${typeof dt[1] === 'number' ? dt[1] : `'${dt[1]}'`}`
        : allColumns += `${dt[0]} = ${typeof dt[1] === 'number' ? dt[1] : `'${dt[1]}'`}`;
    });
    const result = await client.query(`UPDATE ${table} SET ${allColumns} WHERE id = ${id} RETURNING *;`);
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
      `DELETE FROM ${table} WHERE id = ${id} RETURNING id;`,
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
