/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('areas_of_interest', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('areas_of_interest');
  // console.log('areas_of_interest get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "name VARCHAR(25) NOT NULL",
  // "description VARCHAR(100)"
  const body = req.body;
  if (!body.name) {
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(body, 'areas_of_interest');
  // console.log('areas_of_interest post', result);
  return res.send(result);
});

routes.put('/:id', async (req, res) => {
  const result = await db.update(req.body, 'areas_of_interest', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('areas_of_interest', req.params.id);
  return res.send(result.rows[0]);
});

module.exports = routes;
