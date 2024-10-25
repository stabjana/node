'use strict';

const http = require('http'); // no need for path because its a built in module of node

const port = 3001;
const host = 'localhost'; // or use 127.0.0.1 if it doesnt work

const server = http.createServer((request, response) => {
    console.log('server got request');
    response.writeHead(200, { // needs to be there that the browser can render it
        'Content-Type': 'text/plain' // tell the browser that an html is coming back
    });
    response.write('<h1>Hello</h1>'); // respo needs to be closed
    response.end();

}); // request from browser, response from server

server.listen(port, host,
    () => console.log(`Server ${host}:${port} is serving`));


// end the server with control+c

