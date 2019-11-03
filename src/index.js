const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://rh-lab-frontend.marlosaugusto.now.sh, https://rh-lab-frontend-git-develop.marlosaugusto.now.sh, localhost:3000, http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.json({ hello: 'World' }));
app.use('/users', require('./services/routes/users'));
app.use('/tables', require('./services/routes/tables'));
app.use('/vagas', require('./services/routes/vagas'));
app.use('/companys', require('./services/routes/companys'));

app.listen(process.env.PORT || 3000);
