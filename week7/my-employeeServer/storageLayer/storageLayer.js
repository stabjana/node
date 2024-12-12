'use strict';

const path = require('path');

const { readStorage, writeStorage } = require('./readerWriter');
const { adapt } = require('./personAdapter');

const storageFilePath = path.join(__dirname, 'employees.json');

const PRIMARY_KEY = 'id'; // hard coded not nice - should be parameterized

async function getAllFromStorage() {
    return await readStorage(storageFilePath);
}

async function getFromStorage(value, key = PRIMARY_KEY) { // sets key as primary key as default
    const dataArray = await readStorage(storageFilePath);
    return dataArray.filter(item => item[key] == value)
    // return (await readStorage(storageFilePath)).filter(item=>item[key]==value);
}

async function addToStorage(newObject) {
    const storage = await readStorage(storageFilePath);
    storage.push(adapt(newObject)); // we push it through the adapt
    return await writeStorage(storageFilePath, storage); // wea are replacing the whole array with the new one
}

async function removeFromStorage(value) { //value is for primary_key
    const storage = await readStorage(storageFilePath);
    const ind = storage.findIndex(item => item[PRIMARY_KEY] == value);
    if (ind < 0) return false;
    storage.splice(ind, 1);
    return await writeStorage(storageFilePath, storage); // writes everything back to storage
}

async function getKeys() {
    const storage = await readStorage(storageFilePath);
    const keys = new Set(storage.flatMap(item => Object.keys(item))); // Set makes them unique and .flatMap creates array of strings (makes it into one dimension) (Map makes 2 dimensional array-- means: --returns an array with arrays)
    return [...keys];
}

module.exports = {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    removeFromStorage,
    getKeys,
    primary_key: PRIMARY_KEY
}