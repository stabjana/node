'use strict';

const fs = require('fs').promises;

async function sendFile(res, filePath, contentType = 'text/html') {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch (err) {
        res.statusCode = 404;
        res.end(`Error: ${err.message}`); //just for debugging
    }
}

const allowedFormats=[
    'application/x-www-form-urlencoded',
    'application/json'
];

async function getEncodedPostData(request){
    return new Promise((resolve,reject)=>{
        const type=request.headers['content-type'];

        if(allowedFormats.includes(type)){
            const databuffer=[];
            request.on('data', fragment=>databuffer.push(fragment));
            request.on('end',()=>{
                const data=Buffer.concat(databuffer).toString();
                if(type==='application/json'){
                    return resolve(JSON.parse(data));
                }
                else{
                    const params=new URLSearchParams(data);
                    const jsonResult={};
                    params.forEach((value,name)=>jsonResult[name]=value);
                    return resolve(jsonResult);
                }
            });
            request.on('error',()=>reject('Error during transmission'));
        }
        else{
            reject('Unsupported Content-Type');
        }
    })
}

module.exports = { sendFile, getEncodedPostData }