# Car storage API

## cars.json

```json
[
  { "model": "Fast GT", "license": "ABC-1" },
  { "model": "Errare", "license": "XYZ-123" },
  { "model": "Fast GT", "license": "HI-1" },
  { "model": "MbW", "license": "A-1" }
]
```

## function: **getAllModels()**

returns the names of all models as an array of strings  
the name is added only once in this array  
if nothing is found, it returns an empty array

#### example

```json
["Fast GT", "Errare", "MbW"]
```

## **getCar(key,value)**

search function with key value pair as Parameters

returns an array of all cars that matches the given key value pair
if nothing is found, it returns an empty array

#### example

```js
getCar('model', 'Fast GT);
getCar('license', 'A-1');
```

## **getAllCars()**

takes URL parameters and gives back array of cars
returns an array of all cars or empty array

# car server usage

## get all cars

```
http://localhost:3000/cars
```

(later we can use fetch wit our json server)

## get all models

```
http://localhost:3000/models
```

## search by license

```
http://localhost:3000/search/bylicense?value=ABC-1
```

or

```
http://localhost:3000/search?key=license&value=ABC-1
```

## search by model

```
http://localhost:3000/search?key=model&value=MbW
```
