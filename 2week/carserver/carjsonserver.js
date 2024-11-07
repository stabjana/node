'use strict';

const http = require('http');
const { port, host } = require('./config.json');
const { getAllCars, getAllModels, getCar } = require('./carstorage');

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

})