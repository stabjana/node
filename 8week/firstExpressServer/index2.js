'use strict';

const http = require('http');
const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const server = http.createServer(app);

app.get('/', /* middleware would be here */(req, res) => res.send('<h1>Hello 2 the sun!</h1>'));

app.listen(port, host, () => console.log(`Server ${host}:${port} serving`));