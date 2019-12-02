/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('companys', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('companys');
  // console.log('Companys get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "name VARCHAR(50) NOT NULL",
  // "city VARCHAR(50)",
  // "UF VARCHAR(2)",
  // "sector VARCHAR(50)",
  // "phone VARCHAR(15)",
  // "email VARCHAR(50)"
  const body = req.body;
  if (!body.name) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(body, 'companys');
  return res.send(result);
});

routes.put('/:id', async (req, res) => {
  const result = await db.update(req.body, 'companys', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('companys', req.params.id);
  return res.send(result.rows[0]);
});

module.exports = routes;
