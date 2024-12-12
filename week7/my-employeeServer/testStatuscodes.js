'use strict';

const { CODES, TYPES, MESSAGES } = require('./storageLayer/statusCodes.js');
/* console.log(CODES);
console.log(TYPES);
console.log(MESSAGES); 
console.log(MESSAGES.PROGRAM_ERROR()); */ // calling the function inside the object 

const result = MESSAGES.NOT_FOUND('id', 3);
// console.log(result);

if (result.code === CODES.NOT_FOUND) {
    console.log('###dkljkl');
    console.log('Status:', result.message);
    console.log('code:', result.code);
}
else {
    console.log(oihoih);
}
