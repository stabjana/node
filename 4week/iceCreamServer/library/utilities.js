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
module.exports = { read };