'use strict';

const path = require('path');

const express = require('express');
const app = express();

const port = 3000;
const host = 'localhost';

const homePath = path.join(__dirname, 'home.html');
const pageApath = path.join(__dirname, 'pageA.html');

app.use(express.static(path.join(__dirname, 'public'))); // everything in publ folder is accessible directly from the web pages


app.get('/', (req, res) => res.sendFile(homePath));
app.get('/pageA', (req, res) => res.sendFile(pageApath));

app.post('/data', express.urlencoded({ extended: true }), (req, res) => { // after it has run url encoded it has the body in the data
    //  console.log(req.body); // console: { firstname: 'a', lastname: 'b' }
    res.send(`<h1>${req.body.firstname} ${req.body.lastname}</h1>`);
});

app.post('/datajson', express.json(), (req, res) => {
    const messageFromBrowser = req.body.message;
    res.json({ message: `Thank you for message ${messageFromBrowser}` });
});


app.listen(port, host, () => console.log(`Server ${host}:${port} serving`));