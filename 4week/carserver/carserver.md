# Car storage API

## cars.json
```json
[
    {"model":"Fast GT", "licence":"ABC-1"},
    {"model":"Errare", "licence":"XYZ-123"},
    {"model":"Fast GT", "licence":"HI-1"},
    {"model":"MbW", "licence":"A-1"}   
]
```

## **getAllModels()**
return the names of all models as an array of strings. The name is added to the array only once. If nothing is found, an empty array is returned.

### example
```json
["Fast GT", "Errare", "MbW]
```

## **getCar(key,value)**

returns an array of all cars that matches the given key-value pair. If there is no match, an empty array is returned

### Example
```js
getCar('model','Fast GT);
getCar('licence', 'A-1);
```

## **getAllCars()**
returns all cars in an array or an empty array.

# carserver usage

## get all cars
```
http://localhost:3000/cars
```

## get all models
```
http://localhost:3000/models
```

## search by licence
```
http://localhost:3000/search?key=licence&value=ABC-1
```

## search by model
```
http://localhost:3000/search?key=model&value=MbW
```