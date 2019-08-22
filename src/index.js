const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://rh-lab-frontend.marlosaugusto.now.sh'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.json({ hello: 'World' }));
app.use('/users', require('./db/users'));
app.use('/tables', require('./db/tables'));

app.listen(process.env.PORT || 3000);
