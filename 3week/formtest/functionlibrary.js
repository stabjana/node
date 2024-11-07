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

module.exports = { sendFile }