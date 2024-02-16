const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

app.use((req, res, next) => {
  // console.log(`Endpoint hit: ${req.httpVersion} ${req.method} ${req.url}`);

  console.log("\n---\n");
  console.log(`Method: ${req.method}`);
  console.log(`Host: ${req.get("host")}`);
  console.log(`Path: ${req.path}`);

  console.log(`Headers:`);
  console.log(JSON.stringify(req.headers, null, 2));

  console.log(`Params:`);
  console.log(JSON.stringify(req.query, null, 2));

  console.log(`Body:`);
  console.log(JSON.stringify(req.body, null, 2));

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    status: "OK",
    message: req.header("X-Custom-Message"),
    cert: req.header("X-Forwarded-Tls-Client-Cert"),
    info: req.header("X-Forwarded-Tls-Client-Cert-Info"),
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
