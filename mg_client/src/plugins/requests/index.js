const axios = require("axios");
const rootUrl = `http://${window.location.host}/mocking_G`;

function get(path, params) {
  const from = `${rootUrl}${path}`;
  const query = { params };

  return axios.get(from, query);
}

export { get };
