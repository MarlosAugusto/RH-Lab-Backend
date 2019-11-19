/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('vacancy_of_interest', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('vacancy_of_interest');
  console.log('vacancy_of_interest get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "id_user INTEGER REFERENCES users(id)",
  // "id_vaga INTEGER REFERENCES vagas(id)"

  const {
    id_user, id_vaga
  } = req.body;
  if (!id_user || !id_vaga ) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(`(id_user, id_vaga)
  VALUES
  (${`'${id_user}', '${id_vaga}'`})`, 'vacancy_of_interest');
  // console.log('vacancy_of_interest post', result);
  return res.send(result);
});

routes.put('/:id', async (req, res) => {
  const { columns } = req.body;
  let allColumns = '';
  columns.forEach(({ column, value }) => {
    // console.log('test', column, value)
    allColumns
      ? allColumns += `, ${column} = '${value}'`
      : allColumns += `${column} = '${value}'`;
  });
  const result = await db.update(allColumns, 'vacancy_of_interest', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('vacancy_of_interest', req.params.id);
  return res.send(result);
});

module.exports = routes;
