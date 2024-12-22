'use strict';

const { read } = require('./library/utilities');

const filepath = './testutilities.js';

/* read(filepath).then(console.log).catch(console.log); */

read('./iceCreams.json').then(console.log).catch(console.log);
/* read('./iceCream.json').then(data => console.log(data.fileData)).catch(console.log); */
/* read('./iceCream.json').then(data => console.log(data.mime.type, data.fileData)).catch(console.log); */
//same as upper one

/* read('./test.ico').then(console.log).catch(console.log); // for an image (shows binary) */