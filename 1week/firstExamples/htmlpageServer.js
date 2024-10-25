'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<!DOCTYPE html>');
    res.write(`
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <title>myHomePage</title>
</head>
<body>
    <h1>home</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</body>
</html>`); // inside a function can be the code for website no need for res.write, see in other file: htmlwithfunction

    res.end();

});

server.listen(port, host, () => console.log(`server ${host}:${port} serving...`));