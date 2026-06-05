const express = require('express');
const app = express();
const port = 3000;
//var test
const password = '12345678';

app.listen(port, () => {
  console.log(`App running on port ${port} ${password}.`);
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
