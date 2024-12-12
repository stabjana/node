# Employee data storage

## employees.json

creating a storage that reads this kind of data
storage is an array of objects (dynamic storage: we can add and remove objects from the storage) -> employees.json
update is not possible here (will be added later)
we can get
search
add
and remove data

```json
[
  {
    "id": 1,
    "firstname": "Matt",
    "lastname": "River",
    "department": "ict",
    "salary": 4000
  },
  {
    "id": 2,
    "firstname": "Mary",
    "lastname": "River",
    "department": "admin",
    "salary": 5000
  }
]
```

when error, it returns an empty array, because we didnt do the error handling

we want to use layer software (auch genannt tier (layered design))
that means: we can modify our program much more easy
eg change json to csv - we would only need to change the reader writer function

## storageLayer API

### private API

#### files

- readerWriter.js

  - readStorage
    - returns an array of employees / []
  - writeStorage
    - returns true/false

we are paramererizing in the next version with express

- personAdapter.js

  - adapt - casts id and salary to numbers
    make sure that employees have numbers where we should have numbers
    because it returns integers to salary and id and it needs to be casted to int if neccessary

- storageLayer.js
  - serves the public API
  - getAllFromStorage - returns an array of employees / []
    will have ft that will search the objects
    and returns an array of objects
  - getFromStorage
    - returns an array of objects matching the criteria / []
  - addToStorage
    - returns true/false
  - removeFromStorage
    - returns true/false (if succeeded true, if not: false)
  - getKeys
    - returns all keys (once) in an array / []
      we go through whole json and check which key names are in use and gets all the keys
      it returns all the keys (once) in the array (no key will be double)
  - primary_key
    - returns the unique primary_key
      what is our primary key in the layer?

it reads the json and converts to objects and returns something
working with arrays, js objects and json objects

is used by public API we create now
it returns the whole json

### public API

what operations shall be offered here? (functions):

**data storage layer is the top layer!**

more useful statuscode: object that gives information what the error is, so we create status codes
we are using js file to make the json obj modifyable

#### Files

- dataStorageLayer.js (top layer: offering the api to another application)

  - Datastorage class
  - top layer of the storage

  - getAll() [same structure as above: storageLayer.js]

    - reads from storage and returns an arr of all employees or emty arr []

  - get(value,key)

    - returns an arr of matching employees or an empty array

  - insert(newItem)
    - returns INSERT okay or not inserted or already in use (return values)
    - if id exists already then it says already in use

- remove(value) (kakes the key/ id)

  - returns remove okay or not_REMOVED or not found

- getter CODES

  - array of stetuscodes

- getter TYPES

  - array of types of statuscodes (info and error)

- getter KEYS

  - returns an array of keys or empty array

- getter PRIMARY_KEY

  - unique key for object

GETTER = will be used like variables

- statusCodes.js
  will have: Code, Type, MEssages

```js
// just a few examples
const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2
    (more codes...)
}

// we have 2 types

const TYPES = {
    ERROR:'error',
    INFO:'info'
}

// Format of messages:

const MESSAGES = {
    PROGRAM_ERROR: () => ({
        message:'sorry for error',
        code:CODES.PROGRAM_ERROR,
        type:TYPES.ERROR
    }),
    NOT_FOUND:(key,value) => ({
        message:`No ressource found with ${key} ${value}.`, // eg: No ressource found with id 1.
        code:CODES.NOT.FOUND,
        type:INFO
    })
    INSERT_OK:(key,value) => ({
        message:`Ressource found with ${key} ${value} was inserted.`,
        code:CODES.INSERT_OK,
        type:TYPES.INFO
    })
}

```

**Test the layers one by one, right after finishing the "component" that makes finding an error easier**
