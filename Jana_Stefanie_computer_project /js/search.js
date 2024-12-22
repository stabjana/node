'use strict';

(function () {

    let keylist;
    let resultarea;
    let searchvalue;

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        keylist = document.getElementById('keylist');
        resultarea = document.getElementById('resultarea');
        searchvalue = document.getElementById('searchvalue');

        try {
            const data = await fetch('/keys');
            if (data.ok) {
                const keys = await data.json();
                if (keys.length > 0) {
                    populateList(keys);
                }
                else {
                    showMessage('search not available');
                }
            }
            else {
                showMessage('not available');
            }
        }
        catch (err) {
            showMessage(err.message);
        }
    }

    function populateList(keynames) {
        for (const field of keynames) {
            const option = document.createElement('option');
            option.value = field;
            option.textContent = field;

            keylist.appendChild(option);
        }

        keylist.value = keynames[0];
        keylist.addEventListener('change', clear);
        searchvalue.addEventListener('focus', clear);
        document.getElementById('submit').addEventListener('click', send);

    }

    function clear() {
        resultarea.innerHTML = '';
        searchvalue.value = '';
    }

    function showMessage(message) {
        resultarea.innerHTML = `<p>${message}</p>`
    }

    async function send() {
        const keyName = keylist.value;
        const value = searchvalue.value;

        try {
            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify({ value, key: keyName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const data = await fetch('/search', fetchOptions);
            const result = await data.json();

            updatePage(result);
        }
        catch (err) {
            showMessage(err.message);
        }
    }

    function updatePage(data) {
        if (!data) {
            showMessage('Program error!');
        }
        else if (data.length === 0) {
            showMessage('Nothing found');
        }
        else {
            const htmlString = data.map(item => Computer(item)).join(' ');
            resultarea.innerHTML = htmlString;
        }

    }

    function Computer(computer) {
        return `<div class="computer">
        <p>id: ${computer.id}</p>
        <p>Name: ${computer.name}</p>
        <p>Type: ${computer.type}</p>
        <p>Price: ${computer.price}€</p>
        <p>Processor: ${computer.processor}</p>
        </div>
        `
    }
})();