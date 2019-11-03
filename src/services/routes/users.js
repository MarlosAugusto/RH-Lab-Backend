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
  const result = await db.findWhere('users', `WHERE email = '${email}' AND password = '${b64.encode(password)}`);

  return res.send(result);
});

routes.get('/:id', async (req, res) => {
  const result = await db.find('users', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('users');
  return res.send(result);
});

routes.post('/', async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "type VARCHAR(10) NOT NULL",
  // "name VARCHAR(120) NOT NULL",
  // "email VARCHAR(120) NOT NULL",
  // "CPF VARCHAR(14) NOT NULL UNIQUE",
  // "RG VARCHAR(12) NOT NULL UNIQUE",
  // "birth_date TIMESTAMP",
  // "password VARCHAR(50) NOT NULL",
  // "CEP VARCHAR(9)",
  // "city VARCHAR(100)",
  // "UF VARCHAR(2)",
  // "street VARCHAR(100)",
  // "number VARCHAR(10)",
  // "complement VARCHAR(100)",
  // "contacts VARCHAR(500)",
  // "areas_of_interest VARCHAR(200)",
  // "wage_claim DECIMAL(10,2)"
  const {
    type, name, email, CPF, RG, password, birthdate, CEP, city, UF, street, number, complement, contacts, areas_of_interest, wage_claim
  } = req.body;
  if (!type || !name || !email || !CPF || !RG || !password) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(`(type, name, email, CPF, RG, password${birthdate ? ', birthdate' : ''}${CEP ? ', CEP' : ''}${city ? ', city' : ''}${UF ? ', UF' : ''}${street ? ', street' : ''}${number ? ', number' : ''}${complement ? ', complement' : ''}${contacts ? ', contacts' : ''}${areas_of_interest ? ', areas_of_interest' : ''}${wage_claim ? ', wage_claim' : ''})
  VALUES
  (${`'${type}', '${name}', '${email}'`}, '${CPF}', '${RG}', '${password}'${birthdate ? `, '${birthdate}'` : ''}${CEP ? `, '${CEP}'` : ''}${city ? `, '${city}'` : ''}${UF ? `, '${UF}'` : ''}${street ? `, '${street}'` : ''}${number ? `, '${number}'` : ''}${complement ? `, '${complement}'` : ''}${contacts ? `, '${contacts}'` : ''}${areas_of_interest ? `, '${areas_of_interest}'` : ''}${wage_claim ? `, '${wage_claim}'` : ''})`, 'users');
  // console.log('Users post', result);
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
  const result = await db.update(allColumns, 'users', req.params.id);
  return res.send(result);
});

routes.delete('/:id', async (req, res) => {
  const result = await db.destroy('users', req.params.id);
  return res.send(result);
});

module.exports = routes;
