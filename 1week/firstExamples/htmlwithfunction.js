'use strict';

const http = require('http'); // with node express no need for that but here we need it

const { port, host } = require('./config.json');

// data storage in person.json file
const person = require('./person.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(createHtml(person)); // dont forget the function call here! :)
    // its also possible to combine the res.write to one line inside the res.end
    // 
});

server.listen(port, host,
    () => console.log(`server ${host}:${port} serving...`));

function createHtml(personData) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Person</title>
</head>

<body>
    <h1>Person Data</h1>
    <h2>${personData.firstname} ${personData.lastname}</h2>
</body>

</html>
    `;
}

/* console.log(createHtml(person));
 */

