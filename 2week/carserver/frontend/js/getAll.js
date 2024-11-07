'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const data = await fetch(`http://localhost:3000/cars`, { mode: 'cors' });
            const cars = await data.json();

            const resultset = document.getElementById('resultset');

            for (const car of cars) {
                const tr = document.createElement('tr'); // save some lines to create cells: with new ft
                tr.appendChild(createCell(car.model));
                tr.appendChild(createCell(car.license));
                resultset.appendChild(tr);
            }

        } catch (error) {
            // only if connection fails - we need to check fetch okay (but we skip it)
        }
    } // end of init function

    function createCell(text) {
        const td = document.createElement('td');
        td.textContent = text;
        return td;
    }

})(); // ft will automatically run (need to have these add () for it to run)