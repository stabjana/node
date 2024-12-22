'use strict';

const Datastorage = require('./storageLayer/dataStorageLayer');

const register = new Datastorage();

/* console.log(register.CODES);
console.log(register.TYPES);
console.log(register.PRIMARY_KEY); */

// console.log(register.KEYS); // its async and it is not finished when run --- not working like that

// register.KEYS.then(console.log); // async way

// register.getAll().then(console.log); // is async because its reading and writing to the disc!

// register.get(2).then(console.log); // to get the second (id) from the storage

// register.get('River', 'lastname').then(console.log); // you can send them from webpage and you can respond it to the browser

const matt = {

    "id": 1,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000

};

// register.insert(matt).then(console.log).catch(console.log);

// register.remove(1).then(console.log).catch(console.log);

