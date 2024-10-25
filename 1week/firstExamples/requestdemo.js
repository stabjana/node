'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    // console.log(req.url); -> here we print in console what we put in the adress field of browser behind the page name

    const myurl = new URL(`http://${req.headers.host}${req.url}`);
    console.log(myurl);
    const { pathname } = myurl; // now we can have the pathname here

    // console.log(req); // here you can see everything, and there the keys:
    // console.log(Object.keys(req));
    // and here the method:
    // console.log(req.method);
    //console.log(req.httpVersion);
    // console.log(req.headers);
    // console.log(req.headers['user-agent']); // need klammern wegen minus, den array style benutzen

    let message;
    if (pathname === '/pageA') {
        message = 'pageA';
    }
    else {
        message = 'something else';
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(`<h1>${message}</h1>`);
});

server.listen(port, host,
    () => {
        console.log(`Server ${host}:${port} listening`)
    });