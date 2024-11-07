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

})();



function createCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}