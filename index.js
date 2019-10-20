const gen = require('./generator/generator');
const express = require('express')
const app = express()
const { exec } = require('child_process');
const renderClient = require('./renderClient');
 
app.get('/mocking_G', function (req, res) {
  // res.send('Hello World')
  const payload = (0, renderClient.renderClient)({});
  sendResponse(res, 'text/html', payload);
})
 
app.listen(5588);

gen.schemes.setApp(app);


function sendResponse(response, type, data) {
  const chunk = Buffer.from(data, 'utf8');
  response.setHeader('Content-Type', type + '; charset=utf-8');
  response.setHeader('Content-Length', String(chunk.length));
  response.end(chunk);
}



module.exports = gen;
