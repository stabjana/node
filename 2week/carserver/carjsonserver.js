'use strict';

const http = require('http');
const { port, host } = require('./config.json');
const { getAllCars, getAllModels, getCar } = require('./carstorage.js');

/* we can use the code thats already in use from our server */

const server = http.createServer((req, res) => { // we dont need URI decode, we have only limited but good practice
    const { pathname, searchParams } =
        new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    // result in an array instead of a string
    let resultJson = [];

    if (route === '/cars') { // i will send some data - json will be sent to our browser
        resultJson = getAllCars();
    }
    else if (route === '/models') {
        resultJson = getAllModels();
    }
    else if (route === '/search') {
        resultJson = getCar(searchParams.get('key'), searchParams.get('value'));
    }
    else {
        resultJson = { message: 'not found' }
        // if I want to figure out if its an error then we need to have an object
    }// have to allow the erver to connect from another origin
    // cross origin problem
    res.writeHeader(200, {
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'// no matter where you are in the world you can access the server
    });

    res.end(JSON.stringify(resultJson));
})
server.listen(port, host, () => console.log(`${host}:${port} serving`));
