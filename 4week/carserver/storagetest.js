'use strict';

const { 
    getAllCars, 
    getAllModels, 
    getCar } =require('./carstorage');

console.log(getAllCars());
console.log(getAllModels());
console.log(getAllModels().sort());

console.log(getCar('licence','A-1'));
console.log(getCar('licence', 'AB-199'));
console.log(getCar());
console.log(getCar('model', 'Errare'));
console.log(getCar('model', 'Fast GT'));