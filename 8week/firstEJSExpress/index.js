'use strict';

const path = require('path');
const express = require('express');
const app = express();

const { port, host } = require('./config.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageTemplates'));

app.use(express.urlencoded({ extended: true }));

const homePath = path.join(__dirname, 'home.html');

app.get('/', (req, res) => res.sendFile(homePath));

const users = {
    matt: 'secret',
    mary: '1234',
    jesse: 'xyz'
};

/* app.post('/login', (req, res) => {
    res.render('result', {
        title: 'Your title',
        header: 'Your sent these',
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })
}); */ // end of post operation

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (Object.keys(users).includes(username) &&
        users[username] === password) {

        res.render('result', {
            title: 'Your title',
            header: 'Your sent these',
            data: {
                username: req.body.username,
                password: req.body.password
            }
        });
    }
    else {
        // res.render('errorPage', { username });
        res.render('userlist', {
            title: 'users',
            header: 'users',
            users: Object.keys(users)
        });
    }
}); // end of post operation



app.listen(port, host, () => console.log(`Server: ${host}:${port} is serving`));

// DOM is not accessible in the backend - it can't use front side JS - JS can be added to the ejs files then it can access DOM