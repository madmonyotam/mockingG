const express = require("express");
const favicon = require("express-favicon");
var cors = require('cors')
const path = require("path");
const port = process.env.PORT || 5588;
const app = express();

const gen = require("./generator/generator");
const categoryTypes = require('./types/collection/categoryTypes');

app.use(cors());

app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/mocking_G", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

gen.setApp(app);
gen.types.setApp(app);
gen.schemas.setApp(app);
const catTypes = categoryTypes(gen);
gen.types.addTypes(catTypes);

app.listen(port);
console.log(`running on port ${port}`);


module.exports = gen;
