'use strict';

const cars = require('./cars.json');

// it is the long version of the function
const tmp = cars.map(car => car.model);
console.log(tmp);

const models = [...new Set(tmp)];
console.log(models);