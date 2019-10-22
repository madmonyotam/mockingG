let fs = require("fs");

function renderClient(params) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>MockingG</title>
  <meta name="robots" content="noindex" />
  <meta name="referrer" content="origin" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  }
  .App {
    text-align: center;
  }
  .App-logo {
    height: 40vmin;
  }
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: #fff;
  }
  .App-link {
    color: #09d3ac;
  }
  </style>
  </head>
  
  <body>
  <div id="root" class="App-header">Loading...</div>
  <script>
    ReactDOM.render(React.createElement(App), document.getElementById('root'));
  </script>
  </body>
  `;
}

exports.renderClient = renderClient;
