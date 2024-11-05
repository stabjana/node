'use strict';

// storage test for the server if there is no mistake

const { getAllCars, getAllModels, getCar } = require('./carstorage');

console.log(getAllCars());
console.log(getAllModels());
console.log(getAllModels().sort()); // if you wanted it to be sorted

// run the test: node storagetest ----> all are there

console.log(getCar('license', 'A-1'));
console.log(getCar('license', 'AB-199'));
console.log(getCar());
console.log(getCar('model', 'Errare'));
console.log(getCar('model', 'Fast GT'));
