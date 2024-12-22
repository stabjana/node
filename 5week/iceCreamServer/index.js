'use Strict';

const http = require('http');
const path = require('path');
const { port, host } = require('./config.json');

const { read, send, sendJson, isIn } = require('./library/utilities');
const { getAllFlavours, getIceCream, hasFlavour } = require('./iceCreamStorage/iceCreamFreezer');

const homePath = path.join(__dirname, 'home.html');

const resourceRoutes = ['/styles/', '/js/', '/images/', '/favicon'];


// server coding:

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    try {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result); // result is the object that has the fileData
        }
        else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            send(res, result);
        }
        else if (route === '/flavours') { // get them from server and update my webpage with that via fetch(or axios?)
            const flavours = await getAllFlavours();
            sendJson(res, flavours); // not want to create a obj with mimetype therefore: sendJson
        }
        else if (isIn(route === '/icecreams')) { // route could be: /icecreams/vanilla
            const pathParts = route.split('/');
            if (pathParts.length > 2) {
                const iceCreamFlavour = pathParts[2];
                if (await hasFlavour(iceCreamFlavour)) {
                    const iceCream = await getIceCream(iceCreamFlavour);
                    sendJson(res, iceCream);
                }
                else {
                    sendJson(res, { message: 'Icecream not found' }, 404);
                }
            } // STILL SHOWS MESSAGE NOT FOUND, HOW TO FIX IT? "message": "not found"
            else {
                sendJson(res, { message: 'Flavour missing' }, 404);
            }
        }

        else {
            sendJson(res, { message: 'not found' }, 404);
        }

    } catch (error) {
        sendJson(res, { message: error.message }, 500); // response status codes
    }

});

server.listen(port, host, () => console.log(`Server ${host}:${port} listening...`));

// see the pictures inside the images folder: http://localhost:3000/images/icons8-hr-32.png