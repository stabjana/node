'use strict';

function adapt(person) {
    return Object.assign(person, {
        id: +person.id, // same as: id:Number(person.id)
        salary: +person.salary
    });
}

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