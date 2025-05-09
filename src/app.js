const express = require('express')
const app = express()
const port = 3000

// var test = 0; 

app.get('/', (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile('views/index.html', { root: __dirname })
})

app.listen(port, () => {
  console.log('Example app listening on port: ' + port)
})



