'use strict';


// a hard coding example

const http = require('http');
const { host, port } = require('./config.json');
const {
    getAllCars,
    getAllModels,
    getCar } = require('./carstorage');


const server = http.createServer((req, res) => {

    const { pathname, searchParams } =
        new URL(`http://${req.headers.host}${req.url}`);
    /*  Hier wird die Adresse (URL) analysiert, also z.B. welche Seite (oder „Route“) der Benutzer angefragt hat – etwa /cars oder /models. pathname ist der Pfad zur Seite und searchParams sind zusätzliche Infos, die bei der Suche helfen. */

    const route = decodeURIComponent(pathname);
    /*  URLs enthalten manchmal Sonderzeichen, die kodiert sind (z.B. ein Leerzeichen als %20 oder ä als %C3%A4). Der Befehl decodeURIComponent macht solche kodierten Zeichen wieder lesbar, indem er sie in ihre ursprüngliche Form zurückwandelt. */


    // webpage is a string, i create a string
    // mssg variable and give error mssg
    // our functions all return arrays
    // create a fut that takes arr as param and get a eg list back

    // webpage creation programmatically:

    let resultHtml = ''; // every function returns a string - will be interpreted and then shown in the web page

    if (route === '/') {
        resultHtml = createMessagePage('use cars, models or search')

    }
    else if (route === '/cars') {
        resultHtml = createCarsHtml(getAllCars());
    }
    else if (route === '/models') {
        resultHtml = createModelsList(getAllModels());
    }
    else if (route === '/search') {                 // use routes to write data
        if (searchParams.has('key') && searchParams.has('value')) {
            const key = searchParams.get('key');
            const value = searchParams.get('value');
            resultHtml = createCarsHtml(getCar(key, value));
        }
        else {
            resultHtml = createMessagePage('key or value missing');
        }
    }
    else {
        resultHtml = createMessagePage(`no route ${route}`);
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(resultHtml);
});

// NEXT TIME we'll do a JSON server

function createCarsHtml(carsArray) {
    let htmlString = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Car table</title>
        </head>
        <body>
        <h1>Search result</h1>`;
    if (carsArray.length === 0) {
        htmlString += `<h2>No cars found</h2>`;
    }
    else {
        htmlString += `<table>
            <thead>
            <tr>
            <th>Model</th>
            <th>License</th>
            </tr>
            </thead>
            </tbody>`;
        for (const car of carsArray) {
            htmlString += `<tr>
                <td>${car.model}</td><td>${car.license}</td>
                </tr>`
        }
        htmlString += `</tbody>
            </table>`;
    }
    htmlString += `</body>
        </html>`;
    return htmlString;
}

function createModelsList(models) {
    let htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        </head>
        <body>
        <h1>Cars</h1>
        <ul>
        <li>${models.join('</li><li>')}</li>
        </ul>
        </body>
        </html>`;

    return htmlString;
}

function createMessagePage(message) {
    let htmlString = `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Info</title>
        </head>
        <body>
        <h1>Message</h1>
        <p>${message}</p>
        </body>
        </html>`;

    return htmlString;
}
server.listen(port, host, () => console.log(`Server ${host}:${port} serving!`));
