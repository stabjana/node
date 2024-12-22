'use strict';

const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

app.get('/', /* middleware would be here */(req, res) => res.send('<h1>Hello sun!</h1>'));

app.listen(port, host, () => console.log(`Server ${host}:${port} serving`));