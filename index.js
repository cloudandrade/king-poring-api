var express = require('express')
var app = express()

app.use('/', (req,res) => {res.send('KING-PORING API ON')})

app.listen(8000, () => console.log('API ONLINE NA PORTA 8000'))