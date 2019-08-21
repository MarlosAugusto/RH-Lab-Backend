const b64 = require('base-64');
const routes = require('express').Router();

routes.post("users/save", async (req, res) => {
  const { email, password, name, phone, birthdate } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO users VALUES (${email}, ${b64.encode(password)}, ${name}, ${phone}, ${birthdate};`
    );
    client.release();
    return res.json(result);
  } catch (err) {
    return res.send("Error " + err);
  }
})

routes.post("users/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await client.query(
      `SELECT id FROM users WHERE email = "%${email}%" AND password = ${b64.encode(password)};`
    );
    client.release();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.send("Error " + err);
  }
})

module.exports = routes;