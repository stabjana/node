'use strict';

const cars = require('./cars.json');

function getAllCars() {
    return cars;
}

/* function getAllModels() {
    const models = [];

    for (const car of cars) { // when its not there, i push the car
        if (!models.includes(car.model)) { // its easier because we don't need to check the result as we need when use find()
            model.push(car.model);
        }
    }

    return models;
} */

function getAllModels() {
    return [...new Set(cars.map(car => car.model))]; //set removes duplicates, and returns this array
    // ... aus einem Set ganz viele car models - sonst array was 1 set enthält, soll aber arr mit vielen cars sein
    // Set = Menge wo alles nur 1x vorkommen kann
}


function getCar(key, value) {
    const found = [];

    /* that or the other version: if (key && value) {}  */    // if it is not null or undefined

    if (arguments.length === 2) {
        for (const car of cars) {
            if (car[key] === value) {
                found.push(car);
            }
        }
    }
    return found;
}

module.exports = { getAllCars, getAllModels, getCar };