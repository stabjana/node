'use strict';

const fs = require('fs').promises;

async function sendFile(res, filePath, contentType = 'text/html') {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': contentType,                // now content type can change
            'Content-length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);

    } catch (error) {
        res.statusCode = 404;
        res.end(`Error: ${error.message}`);
    }
}
// we can now change the file without having to rewrite the code here

// new Function!!!

const allowedFormats = ['application/x-www-form-urlencoded', 'application/json'] // get the form data in that content type and the json format --- we car parse those formats with this ft

async function getEncodedPostData(request) {
    return new Promise((resolve, reject) => {

        const type = request.headers['content-type'];
        if (allowedFormats.includes(type)) {
            const databuffer = [];
            // on method recognises an incoming event
            request.on('data', fragment => databuffer.push(fragment));
            request.on('end', () => {
                const data = Buffer.concat(databuffer).toString();
                if (type === 'application/json') {
                    return resolve(JSON.parse(data)); // converting the data to an JS object
                }
                else {
                    const params = new URLSearchParams(data);
                    const jsonResult = {};
                    params.forEach((value, name) => jsonResult[name] = value);
                    return resolve(jsonResult);
                }
            });
            request.on('error', () => reject('Error during transmission'));
        }
        else {
            reject('Unsupported Content Type');
        }
    })
}


module.exports = { sendFile, getEncodedPostData }