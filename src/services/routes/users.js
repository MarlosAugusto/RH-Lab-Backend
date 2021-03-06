const firebase = require("firebase");
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
// const b64 = require("base-64");
const routes = require("express").Router();
const db = require("../db");

routes.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Dados incompletos!" })
  }
  let success = false;
  let error = null;
  await firebase.auth()
    .signInWithEmailAndPassword(email, password)
    // .then((result => console.log('result', result)))
    .then(() => (success = true))
    .catch(err => (error = err.code));
  if (error) {
    return res.status(422).send({ error })
  }
  return res.send({ success });
});

routes.post("/auth/sair", async (req, res) => {
  let success = false;
  let error = null;
  await firebase.auth().signOut()
    .then(() => (success = true))
    .catch(err => (error = err.code));
  if (error) {
    return res.status(422).send({ error })
  }
  return res.send({ success });
});

routes.post("/auth/cadastro", async (req, res) => {
  let success = false;
  let error = null;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Dados incompletos!" })
  }
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    // .then((result => console.log('result', result)))
    .then(() => (success = true))
    .catch(err => (error = err.code));
  if (error) {
    return res.status(422).send({ error })
  }
  return res.send({ success });
});

routes.get("/:id", async (req, res) => {
  const result = await db.find("users", req.params.id);
  return res.send(result);
});

routes.get("/", async (req, res) => {
  const result = await db.findAll("users");
  return res.send(result);
});

routes.post("/", async (req, res) => {
  // "id SERIAL PRIMARY KEY",
  // "name VARCHAR(120) NOT NULL",
  // "email VARCHAR(120) NOT NULL",
  // "CPF VARCHAR(14) NOT NULL UNIQUE",
  // "RG VARCHAR(12) NOT NULL UNIQUE",
  // "birth_date TIMESTAMP",
  // "CEP VARCHAR(9)",
  // "city VARCHAR(100)",
  // "UF VARCHAR(2)",
  // "street VARCHAR(100)",
  // "number VARCHAR(10)",
  // "complement VARCHAR(100)",
  // "contacts VARCHAR(500)",
  // "areas_of_interest VARCHAR(200)",
  // "wage_claim DECIMAL(10,2)"
  const body = req.body;
  if (!body.name || !body.email || !body.CPF || !body.RG) {
    return res.send(400, { error: "Dados incompletos!" });
  }
  const result = await db.create(body, "users");
  // console.log('Users post', result);
  return res.send(result);
});

routes.put("/:id", async (req, res) => {
  const result = await db.update(req.body, "users", req.params.id);
  return res.send(result);
});

routes.delete("/:id", async (req, res) => {
  const result = await db.destroy("users", req.params.id);
  return res.send(result.rows[0]);
});

module.exports = routes;
