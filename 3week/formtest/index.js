'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require('./config.json');

const { sendFile, getEncodedPostData } = require('./functionlibrary');

const formPath = path.join(__dirname, 'form.html'); // send it back to browser

const server = http.createServer(async (req, res) => {
    const method = req.method.toUpperCase(); // method to make sure input is Uppercase
    if (method === 'GET') {
        sendFile(res, formPath); // einfach die hauptseite anzeigen am anfang
    }
    else if (method === 'POST') { // submit ist ein POST
        const formData = await getEncodedPostData(req); // wann get und wann post? warum hier so?
        res.writeHead(200, { // echoing the data
            'Content-Type': 'application/json'
        });
        /*   
        before getEncodedPostData: 
        console.log('POST')
          res.end(); */
        res.end(JSON.stringify(formData));
    }
    else {
        res.end();
    }
});
server.listen(port, host, () => console.log(`${host}:&${port} serving`));