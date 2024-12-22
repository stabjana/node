'use strict';

function adapt(computer) {
    return {
        id: Number(computer.id),
        name: computer.name,
        type: computer.type,
        price: computer.price,
        processor: computer.processor
    }
}

module.exports = { adapt }