const express = require('express');
const app = express();
const port = 3000;
//var test

const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

app.use(limiter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
})

const data = {'integrantes':[
  {'nome':'Fulano da Silva'},
  {'nome':'Ciclano Sauro'},
  {'nome':'Flaris Feller'}
]};

app.get('/integrantes', (req, res) => {
  res.json(data);
});

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'empresa'
});

app.get('/usuario', (req, res) => {
  const id = req.query.id;

  // VULNERÁVEL A SQL INJECTION
  const sql = 'SELECT * FROM usuarios WHERE id = ' + id;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});
