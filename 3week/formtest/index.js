'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require('./config.json');

const { sendFile } = require('./functionlibrary');

const formPath = path.join(__dirname, 'form.html'); // send it back to browser

const server = http.createServer((req, res) => {
    const method = req.method.toUpperCase(); // method to make sure input is Uppercase
    if (method === 'GET') {
        sendFile(res, formPath);
    }
    else if (method === 'POST') {
        console.log('POST')
        res.end();
    }
    else {
        res.end();
    }
});
server.listen(port, host, () => console.log(`${host}:&${port} serving`));