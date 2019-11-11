const axios = require("axios");

const rootUrl = "http://localhost:5588/mocking_G";

function get(path, params) {
  let from = `${rootUrl}${path}`;
  let query = { params };

  return axios.get(from, query);
}

export { get };
