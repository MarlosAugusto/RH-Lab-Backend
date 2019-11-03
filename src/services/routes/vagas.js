/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const b64 = require('base-64');
const routes = require('express').Router();
const db = require('../db');

routes.get('/:id', async (req, res) => {
  const result = await db.find('vagas', req.params.id);
  return res.send(result);
});

routes.get('/', async (req, res) => {
  const result = await db.findAll('vagas');
  console.log('Vagas get', result);
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
  const {
    title, description, company, nv_exp, sector, type
  } = req.body;
  if (!title || !description || !company) { // @TODO realizar este tratamento no front
    return res.send(400, { error: 'Dados incompletos!' });
  }
  const result = await db.create(`(title, description, company${nv_exp ? ', nv_exp' : ''}${sector ? ', sector' : ''}${type ? ', type' : ''})
  VALUES
  (${`'${title}', '${description}', '${company}'`}${nv_exp ? `, '${nv_exp}'` : ''}${sector ? `, '${sector}'` : ''}${type ? `, '${type}'` : ''})`, 'vagas');
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
