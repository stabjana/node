'use strict';

const path = require('path'); // dont need mimetypes, data is only used in utilities function

const { read } = require('../library/utilities'); // here we access the ice Cream with 3 fts
// not nice hard Coded part
//the utilities.js reads and handles the mimetypes, we can use it everywhere now and change it however we like
const jsonPath = path.join(__dirname, 'iceCream.json');

async function getAllFlavours() {
    try {
        const data = await read(jsonPath);
        const iceCream = await JSON.parse(data.fileData); // its not static, it always returns a promise

        return Object.keys(iceCream);

    } catch (error) {
        return [];
    }
}
module.exports = { getAllFlavours }