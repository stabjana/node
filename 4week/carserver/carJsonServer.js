//carJsonServer.js

'use strict';

const http = require('http');

const {port,host}=require('./config.json');

const { getAllCars, getAllModels, getCar } = require('./carstorage');

const server = http.createServer((req,res)=>{
    const {pathname,searchParams}=
        new URL(`http://${req.headers.host}${req.url}`);

    const route=decodeURIComponent(pathname);

    let resultJson=[];

    if(route==='/cars'){
        resultJson=getAllCars();
    }
    else if(route==='/models'){
        resultJson=getAllModels();
    }
    else if(route==='/search'){
        resultJson=
            getCar(searchParams.get('key'),searchParams.get('value'));
    }
    else{
        resultJson={message:'not found'}
    }

    res.writeHead(200,{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    });

    res.end(JSON.stringify(resultJson));
});

server.listen(port,host,()=>console.log(`${host}:${port} serving`));
