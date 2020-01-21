const axios = require("axios");
let port = 5588;

// function setPort(p) {
//   port=p;
// }

const rootUrl = `http://localhost:${port}/mocking_G`;

function get(path, params) {
  let from = `${rootUrl}${path}`;
  let query = { params };

  return axios.get(from, query);
}

export { get };
