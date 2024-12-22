'use strict';

class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname; // accessibla with object.lastname
    }
}

const a = new Person('abel', 'smith');
console.log(a);
console.log(a.firstname);
a.firstname = 'drone'; // changing the name
console.log(a.firstname);

// class you can't access directl from outside

class Car {
    #name  // accessibla with object.lastname will not work
    constructor(name) {
        this.#name = name;
    }

    get carName() {
        return this.#name; // you can see the name but not change it with a get
    }

    set carName(newName) {
        this.#name = newName; // this makes the fiel editable 
    }
}

const myCar = new Car('BMW');
// console.log(myCar); // doesn't show the name of the object -- shows: {} because there is no public field
// console.log(myCar.carName); // shows the name

myCar.name = 'ass'
console.log(myCar); // jsut shows the name that is public, not the "real" name of the car
console.log(myCar.carName);
myCar.carName = 'GT';
console.log(myCar.carName);

// Object should be in the STate the I defined
// and check if the data is valid