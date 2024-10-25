'use strict';

const http = require('http');

const port = 3002;
const host = 'localhost';

const person = {
    firstname: "Matt",
    lastname: "River"
}

// request and response: req res & starting the server

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.write(JSON.stringify(person)); // must srtingify the object to send it back
    res.end();
});

server.listen(port, host,
    () => console.log(`Json server at ${host}:${port}`)
);

// data can be fetched from the data storage
// get the JSON string we parse it into the browser side

