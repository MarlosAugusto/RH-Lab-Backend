/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = db.find('vagas', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('vagas');
  console.log('Vagas get', result);
  return res.send(result);
});

routes.post('/', async (req, res) => {
  const {
    quantidade, nome, descricao
  } = req.body;
  if (!quantidade || !nome || !descricao) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(`(quantidade, nome, descricao) VALUES ('${quantidade}', '${nome}', '${descricao}')`, 'vagas');
  console.log('Vagas post', result);
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
  const result = await db.update(allColumns, 'vagas', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('vagas', req.params.id);
  return res.send(result);
});

module.exports = routes;
