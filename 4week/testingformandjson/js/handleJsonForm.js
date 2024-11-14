'use strict';

(function(){
    let firstnameField;
    let lastnameField;
    let result;
    

    document.addEventListener('DOMContentLoaded', init);
    
    function init(){
        firstnameField=document.getElementById('firstname');
        lastnameField=document.getElementById('lastname');
        result = document.getElementById('result');

        document.getElementById('send').addEventListener('click', submit);
    }

    async function submit(){
        const firstname=firstnameField.value;
        const lastname=lastnameField.value;

        const options={
            method:'POST',
            body:JSON.stringify({firstname,lastname}),
            headers:{
                'Content-Type':'application/json'
            }   
        }

        const data = await fetch('/jsondata', options);
        const jsonData=await data.json();
        result.textContent=JSON.stringify(jsonData, null, 4);
    }


})();