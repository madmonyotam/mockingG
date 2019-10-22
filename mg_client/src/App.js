import React from "react";
import "./App.css";
const axios = require("axios");

axios
  .get("http://localhost:5588/mocking_G/getTypes")
  .then(function(response) {
    console.log(response.data);
  });

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
