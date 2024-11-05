'use strict';

const http = require('http');
/* const fs = require('fs').promises;  removed to ft library */

const path = require('path');

const { sendFile } = require('./functionlibrary');

const { port, host } = require('./config.json');

const homePath = path.join(__dirname, 'home.html'); // joins files from the file system
const hobbiesPath = path.join(__dirname, 'hobbies.html'); // easier to refer to the files later with the variables

const server = http.createServer((req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    /*  console.log(pathname);
     console.log(path); */
    const route = decodeURIComponent(pathname);
    if (route == '/') {
        sendFile(res, homePath);
    }
    else if (route === '/hobbies') { // are just the paths and not the file, thats why without dot- must start with slash
        sendFile(res, hobbiesPath);
    }
    else if (route.startsWith('/styles/')) {
        sendFile(res, path.join(__dirname, route), 'text/css');
    }
    else {
        res.end();
    }
});

server.listen(port, host, () => console.log(`Server ${host}:${port} serving!`));

/* async function because a few things happen after reading the FileSystem
 */