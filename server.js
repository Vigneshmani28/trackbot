'use strict';
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const app_folder = 'dist/tracking-web-app/browser';

app.use(express.static(path.join(__dirname, 'dist/tracking-web-app/browser')));

const port = process.env["PORT"] || '4200';
app.set('port', port);

const server = http.createServer(app);

// serve angular paths
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: app_folder});
});

server.listen(port, function () {
  console.log(`Running on localhost:${port}`);
});
