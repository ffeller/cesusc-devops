const express = require('express');
const app = express();
const port = 3000;
//var test

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

executa(app);

function executa(app) {
  const { exec } = require('child_process');

  app.get('/ping', (req, res) => {
      exec(
          'ping -c 4 ' + req.query.host,
          (err, stdout) => {
              res.send(stdout);
          }
      );
  });
}
