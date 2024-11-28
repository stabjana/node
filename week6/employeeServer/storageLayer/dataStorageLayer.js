'use strict';

const { CODES, TYPES, MESSAGES } = require('./statusCodes.js');

const { getAllFromStorage, getFromStorage, addToStorage, removeFromStorage, getKeys, primary_key } = require('./storageLayer.js');

//Datastorage class -- parameterized version we need a function to wrap and to get the params - then create obj.

module.exports = class Datastorage {
    // getters: - written with space - can't have a parameter, just gets sth
    // if we dont get it here we cant access them from the outside

    // getters make classes accessible -- to be able to get values from the classes

    get CODES() {
        return CODES;
    }

    get TYPES() {
        return TYPES;
    }

    get PRIMARY_KEY() {
        return primary_key;
    }

    get KEYS() {
        return getKeys(); // is an async function
    }

    getAll() {
        return getAllFromStorage();
    }

    get(value, key = primary_key) { // or: this.PRIMARY_KEY because its an object-- needed when you use get
        return getFromStorage(value, key); // giving value and key as parameters
    }

    insert(item) {
        return new Promise(async (resolve, reject) => { // resolve will be the bla and the recect will be the catch
            if (item) {
                if (!item[primary_key]) {
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if ((await getFromStorage(item[primary_key])).length > 0) {
                    reject(MESSAGES.ALREADY_IN_USE(item[primary_key]));
                }
                else if (await addToStorage(item)) {
                    resolve(MESSAGES.INSERT_OK(item[primary_key]));
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else {
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } // end of insert

    remove(value) { // reject is always errors, resolve is always info -- or add another thing to TYPES in statusCodes
        return new Promise(async (resolve, reject) => {
            if (!value) {
                reject(MESSAGES.NOT_FOUND(primary_key, '--empty--'));
            }
            else if (await removeFromStorage(value)) {
                resolve(MESSAGES.REMOVE_OK(primary_key, value));
            }
            else {
                reject(MESSAGES.NOT_REMOVED(primary_key, value));
            }
        });
    } // end of remove
}
// end of class