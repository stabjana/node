'use strict';

function adapt(person) { //returns all the fields but changes the input to numbers in id and salary
    return Object.assign(person, {
        id: +person.id,
        salary: +person.salary
    });
}

/* if we would have a lot of strings fields the method above saves time and space */

/* if no change is to be maxHeaderSize, we can : adapterjust passes person through

function adapt... */

//another version
// function adapt(person){
//     return {
//         id:+person.id, //also id:Number(person.id)
//         firstname:person.firstname,
//         lastname:person.lastname,
//         department:person.department,
//         salary:+person.salary
//     }
// }

module.exports = { adapt }