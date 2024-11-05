'use strict';

const fs = require('fs').promises; // fs file system -- from the node documentation

// encoding to save the files
/* fs.readFile('./home.html', 'utf8')
    .then(console.log)      // prints the homepage
    .catch(console.log) */


async function printFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}
printFile('./home.html');
printFile('./hobbies.html');