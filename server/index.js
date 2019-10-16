const express = require('express');

const generator = require('./generator/generator');

const app = express(); 

app.get('/api/greeting', function (req, res) {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
})

app.listen(3001,()=>{
  console.log('Express server is running on localhost:3001')
})

module.exports = {
    generator
}