'use strict';

const http = require('http');
const fs = require('fs').promises;

const path = require('path');

const { port, host } = require('./config.json');

const homePath = path.join(__dirname, 'home.html'); // joins files from the file system
const hobbiesPath = path.join(__dirname, 'hobbies.html'); // easier to refer to the files later with the variables

const server = http.createServer((req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    /* console.log(pathname); */
    const route = decodeURIComponent(pathname);
    if (route == '/') {
        sendFile(res, homePath);
    }
    else if (route === '/hobbies') {
        sendFile(res, hobbiesPath);
    }
    else {
        res.end();
    }
});

server.listen(port, host, () => console.log(`Server ${host}:${port} serving!`));

/* async function because a few things happen after reading the FileSystem
 */


async function sendFile(res, filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);

    } catch (error) {
        res.statusCode = 404;
        res.end(`Error: ${error.message}`);
    }
}

// we can now change the file without having to rewrite the code here