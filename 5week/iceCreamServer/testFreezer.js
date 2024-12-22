'use strict';

const { getAllFlavours, getIceCream, hasFlavour } = require('./iceCreamStorage/iceCreamFreezer.js');

/* getAllFlavours().then(console.log).catch(console.log);
getIceCream('vanilla').then(console.log).catch(console.log);
getIceCream('strawberry').then(console.log).catch(console.log);
getIceCream('raspberry').then(console.log).catch(console.log);
getIceCream('x').then(console.log).catch(console.log); */

/* getIceCream('vanilla')
    .then(data => console.log(data.price))
    .catch(console.log) */

hasFlavour().then(console.log).catch(console.log);
hasFlavour('vanilla').then(console.log).catch(console.log);
