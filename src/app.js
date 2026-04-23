const express = require('express')
const app = express()
const port = 3000
//var test

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname })
})

const data = {'integrantes':[
  {'nome':'fulano da silva'},
  {'nome':'ciclano sauro'},
  {'nome':'Flaris Feller'}
]}

app.get('/integrantes', (req, res) => {
  res.json(data)
})
