'use strict';

const fs = require('fs').promises;
const path = require('path');

const MIMETYPES = require('./mimetypes.json');

function read(filePath) {
    // read a file
    const extension = path.extname(filePath).toLowerCase(); // filenames can have capital letters and low
    /* console.log(extension); */

    const mime = MIMETYPES[extension] || { "type": "application/octet-stream", "encoding": "binary" };
    // file doesnt recognise it, then download it: application/octet-stream

    return fs.readFile(filePath, mime.encoding) // read now also binarys with the mime
        // = promise reversion / only fileData mime goes lost so we need to write it as obj
        .then(fileData => ({ fileData, mime })) // object outcome, see below:
        .catch(err => err); // just for debugging
    /*  {
         fileData:"";
         mime:{type:"", encoding} -- package for the response
     } */
}
// end of read

function send(res, resource) { // resource = an Object with:{ fileData, mime } (from the read file)
    res.writeHead(200, {
        'Content-Type': resource.mime.type, // dont need to give it as a param because its inside the resource already
        'Content-Length': Buffer.byteLength(resource.fileData, resource.mime.encoding) // knowing that all data is sent
    });
    res.end(resource.fileData, resource.mime.encoding);
}

function sendJson(res, jsonResource, statuscode = 200) {
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(statuscode, {
        'Content-Type': 'application/json'
    });
    res.end(jsonData);
}

// checking all the resources and get them in an array, see if root is inthat arr

function isIn(route, ...routes) {
    for (const start of routes) {
        if (route.startsWith(start)) return true;
    }
    return false;
}

module.exports = { read, send, sendJson };