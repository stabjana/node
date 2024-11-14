'use strict';

(function () {
    // 3 var hold handles to input el and buttons
    let result;
    let resultset;
    let searchKey;
    let searchValue;

    const tr = document.createElement('tr');
    const td = document.createElement('td');

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        result = document.getElementById('result');
        resultset = document.getElementById('resultset');
        searchKey = document.getElementById('searchKey');
        searchValue = document.getElementById('searchValue'); // these are slow operations, you should store them in var to use them later, so you only do it once here.

        document.getElementById('submit').addEventListener('click', send);
    }

    async function send() {
        try {
            const key = searchKey.value;
            const value = searchValue.value;

            resultset.innerHTML = '';

            const data = await fatech(`http://localhost:3000/search?key=${key}&value=${value}`,
                { mode: 'cors' }
            );
            const cars = await data.json();

            for (const car of cars) {
                const row = tr.cloneNode(false);
                row.appendChild(crerateCell(car.model));
                row.appendChild(crerateCell(car.license));
                resultset.appendChild(row);
            }

        } catch (error) {
            // put some error here
        }
    } // end of send

    function createCell(text) {
        const cell = td.cloneNode(false);
        cell.textContent = text;
        return cell;
    }

})();