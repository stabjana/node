'use strict';

const { CODES, TYPES, MESSAGES } = require('./statuscodes.js');

const { getAllFromStorage, getFromStorage, addToStorage, removeFromStorage, getKeys, primary_key } = require('./storageLayer.js');


module.exports = class Datastorage {


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
        return getKeys();
    }

    getAll() {
        return getAllFromStorage();
    }

    get(value, key = primary_key) {
        return getFromStorage(value, key);
    }

    insert(item) {
        return new Promise(async (resolve, reject) => {
            if (item) {
                if (!item[primary_key]) {
                    reject(MESSAGES.NOT_INSERTED());
                }
                else if ((await getFromStorage(item[primary_key])).length > 0) {
                    reject(MESSAGES.ALREADY_IN_USE(item[primary_key]));
                }
                else if (await addToStorage(item)) {
                    resolve(MESSAGES.INSERT_OK(primary_key, item[primary_key]));
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            else {
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    }

    remove(value) {
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
    }
}