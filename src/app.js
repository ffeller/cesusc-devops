const express = require('express');
const app = express();
const port = 3000;

// let teste = 1;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
})

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
  const sql = 'SELECT * FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});
