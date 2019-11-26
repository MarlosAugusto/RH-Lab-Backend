/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('vagas', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('vagas');
  // console.log('Vagas get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "title VARCHAR(50) NOT NULL",
  // "description VARCHAR(300) NOT NULL",
  // "company INTEGER REFERENCES companys(id)",
  // "nv_exp VARCHAR(25)",
  // "sector VARCHAR(50)",
  // "type VARCHAR(50)"
  const body = req.body;
  if (!body.title || !body.description || !body.company) {
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(body, 'vagas');
  // console.log('Vagas post', result);
  return res.send(result);
});

routes.put('/:id', async (req, res) => {
  const result = await db.update(req.body, 'vagas', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('vagas', req.params.id);
  return res.send(result);
});

module.exports = routes;
