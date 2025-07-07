const axios = require("axios");

function get(path, params) {
  const rootUrl = `http://${window.location.host}/mocking_G`;
  const from = `${rootUrl}${path}`;
  const query = { params };

  return axios.get(from, query);
}

export { get };
