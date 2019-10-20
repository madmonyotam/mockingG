

function renderClient(params) {
    

    return(
       `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>GraphiQL</title>
  <meta name="robots" content="noindex" />
  <meta name="referrer" content="origin" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    #mocking_g {
      height: 100vh;
    }
  </style>
  </head>
  
  <body>
  <div id="mocking_g">Loading... shiran</div>
  </body>
  `
    )
}

exports.renderClient = renderClient;