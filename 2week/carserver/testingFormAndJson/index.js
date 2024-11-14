'use strict';

const http = require('http');
const path = require('path');

const { sendFile, getEncodedPostData } = require('./functionlibrary.js');

const { port, host } = require('./config.json');

const menuPath = path.join(__dirname, 'menu.html');
const formPath = path.join(__dirname, 'form.html');
const jsonFormPath = path.join(__dirname, 'jsonform.html');

const server = http.createServer(async (req, res) => {
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
        else if (route.startsWith('/js/')) {
            sendFile(res, path.join(__dirname, route), 'text/javascript');
        }
    }
    else if (method === 'POST') { // post operation
        try {
            const data = await getEncodedPostData(req); // sending it back as it is

            if (route === '/formdata') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            } // for the JSON we need js file

            else if (route === '/jsondata') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            }
        }

        catch (error) {
            //send error
        }

    }
});
// event listener BUTTON??
server.listen(port, host, () => console.log(`${host}:${port} serving`));