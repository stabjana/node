'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require('./config.json');

const { read, send, sendJson, isIn, getEncodedPostData } = require('./library/utilities');

const Datastorage = require('./storageLayer/dataStorageLayer');
const { fileURLToPath } = require('url');

const register = new Datastorage();

const ressourceRoutes = ['/favicon', '/pages/', '/styles/', '/js/', '/images/']; // for the isIn part

const homePath = path.join(__dirname, 'menu.html');

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    const method = req.method.toUpperCase(); // if method is get

    if (method === 'GET') {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);
        }
        else if (route === '/keys') {
            sendJson(res, await register.KEYS); // this is the getter (register.KEYS)
        }
        else if (route === '/all') {
            sendJson(res, await register.getAll());
        }
        else if (isIn(route, ...ressourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            if (result.fileData) {
                send(res, result);
            }
            else {
                send(res, await read(homePath));
            }
        }
        else {
            sendJson(res, { message: 'Ressource not found' }, 404);
        }
    }
    else if (method === 'POST') {
        //bla
    }
    else {
        sendJson(res, { message: 'method not in use' }, 405);
    }
}); // end of server

server.listen(port, host, () => console.log(`Server ${host}:${port} serving`));