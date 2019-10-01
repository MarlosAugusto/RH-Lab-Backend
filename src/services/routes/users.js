/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = db.findWhere('users', `WHERE email = '${email}' AND password = '${b64.encode(password)}`);

  return res.send(result);
});

routes.get('/:id', async (req, res) => {
  const result = db.find('users', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = db.findAll('users');
  return res.send(result);
});

routes.post('/', async (req, res) => {
  const {
    email, password, name, phone, birthdate,
  } = req.body;
  if (!email || !password || !name) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = db.create(`${email}', '${b64.encode(password)}', '${name}', '${phone}', '${birthdate}`, 'users');
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
  const result = db.update(allColumns, 'users', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = db.destroy('users', req.params.id);
  return res.send(result);
});

module.exports = routes;
