const express = require("express");
const morgan = require("morgan");
const http2Express = require("http2-express-bridge");
const http2 = require("http2");
const { readFileSync, writeFileSync } = require("fs");

const PORT = 3000;
const CERT_DIR = `${__dirname}/certs`;

const app = http2Express(express);
const httpsOptions = {
  key: readFileSync(`${CERT_DIR}/server.key`),
  cert: readFileSync(`${CERT_DIR}/server.crt`),
  allowHTTP1: true,
};
const httpOptions = {
  allowHTTP1: true,
};
app.use(morgan("HTTP-:http-version :method :url :remote-addr"));

app.use((req, res, next) => {
  console.log(`Headers:`);
  console.log(JSON.stringify(req.headers, null, 4));

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

const server = http2.createServer(httpOptions, app);

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
