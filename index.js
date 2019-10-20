const gen = require('./generator/generator');
const express = require('express')
const app = express()
const { exec } = require('child_process');
 
app.get('/mocking_G', function (req, res) {
  res.send('Hello World')
})
 
app.listen(5588);

gen.schemes.setApp(app);
exec('openClient.bat');



module.exports = gen;
