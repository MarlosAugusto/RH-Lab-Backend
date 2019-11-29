const express = require('express');
const dotenv = require('dotenv');
const firebase = require('firebase');

dotenv.config();

var firebaseConfig = {
  apiKey: "AIzaSyBMdpGmffgrZSeg1nqliytGGQ99UboYJyQ",
  authDomain: "rh-lab.firebaseapp.com",
  databaseURL: "https://rh-lab.firebaseio.com",
  projectId: "rh-lab",
  storageBucket: "rh-lab.appspot.com",
  messagingSenderId: "957446657350",
  appId: "1:957446657350:web:fae4c45bfc009abf67c147"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // for dev
  // res.header('Access-Control-Allow-Origin', 'https://rh-lab-frontend.marlosaugusto.now.sh'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => res.json({ hello: 'World' }));
app.use('/users', require('./services/routes/users'));
app.use('/dbquery', require('./services/routes/dbquery'));
app.use('/tables', require('./services/routes/tables'));
app.use('/vagas', require('./services/routes/vagas'));
app.use('/companys', require('./services/routes/companys'));
app.use('/vacancy_of_interest', require('./services/routes/vacancy_of_interest'));
app.use('/areas_of_interest', require('./services/routes/areas_of_interest'));

app.listen(process.env.PORT || 3000);
