'use strict';

const http = require('http');
const path = require('path');

const { sendFile, getEncodedPostData } = require('./functionlibrary.js');

const { port, host } = require('./config.json');

const menuPath = path.join(__dirname, 'menu.html');
const formPath = path.join(__dirname, 'form.html');
const jsonFormPath = path.join(__dirname, 'jsonform.html');

const server = http.createServer((req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);
    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (route === '/') {
            sendFile(res, menuPath);
        }
        else if (route === '/jsonform') {
            sendFile(res, jsonFormPath);
        }
        else if (route === '/urlform') {
            sendFile(res, formPath);
        }
        else if (route.startsWith('/styles/')) {
            sendFile(res, path.join(__dirname, route), 'text/css'); // warum das hier nötig?
        }
    }
    else if (method === 'POST') {

    }
    else {

    }
});

server.listen(port, host, () => console.lot(`${host}:${port} serving`));