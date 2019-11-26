/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('vacancy_of_interest', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('vacancy_of_interest');
  // console.log('vacancy_of_interest get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "id_user INTEGER REFERENCES users(id)",
  // "id_vaga INTEGER REFERENCES vagas(id)"
  const body = req.body;
  if (!body.id_user || !body.id_vaga) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(body, 'vacancy_of_interest');
  // console.log('vacancy_of_interest post', result);
  return res.send(result);
});

routes.put('/:id', async (req, res) => {
  const result = await db.update(req.body, 'vacancy_of_interest', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('vacancy_of_interest', req.params.id);
  return res.send(result);
});

module.exports = routes;
