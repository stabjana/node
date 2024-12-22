'use strict';

(function(){
    let result;
    let resultset;
    let searchKey;
    let searchValue;

    const tr=document.createElement('tr');
    const td=document.createElement('td');

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        result = document.getElementById('result')
        resultset=document.getElementById('resultset');
        searchKey=document.getElementById('searchkey');
        searchValue=document.getElementById('searchvalue');

        document.getElementById('submit').addEventListener('click', send);

    }

    async function send(){
        try{
            const key=searchKey.value;
            const value=searchValue.value;

            resultset.innerHTML='';

            const data = 
              await fetch(`http://localhost:3000/search?key=${key}&value=${value}`,
                            {mode:'cors'}
              );
            const cars=await data.json();

            console.log(cars)

            for(const car of cars){
                const row=tr.cloneNode(false);
                row.appendChild(createCell(car.model));
                row.appendChild(createCell(car.licence));
                resultset.appendChild(row);
            }
        }
        catch(err){
            //some error handling here
        }
    } //end of send

    function createCell(text){
        const cell=td.cloneNode(false);
        cell.textContent=text;
        return cell;
    }

})();