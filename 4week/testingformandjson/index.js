'use strict';

const http = require('http');
const path = require('path');

const { sendFile, getEncodedPostData } = require('./functionLibrary');

const {port,host} = require('./config.json');

const menuPath = path.join(__dirname,'menu.html');
const formPath=path.join(__dirname,'form.html');
const jsonFormPath=path.join(__dirname,'jsonForm.html');

const server = http.createServer(async (req,res)=>{
    const {pathname}=new URL(`http://${req.headers.host}${req.url}`);

    const route=decodeURIComponent(pathname);
    const method=req.method.toUpperCase();

    if(method==='GET'){
        if(route==='/'){
            sendFile(res,menuPath);
        }
        else if (route ==='/jsonform'){
            sendFile(res,jsonFormPath);
        }
        else if (route ==='/urlform'){
            sendFile(res,formPath);
        }
        else if(route.startsWith('/styles/')){
            sendFile(res,path.join(__dirname,route),'text/css');
        }
        else if(route.startsWith('/js/')){
            sendFile(res, path.join(__dirname,route),'text/javascript');
        }
        else {
            res.end();
        }

    }
    else if(method==='POST'){
        try{
            const data = await getEncodedPostData(req);
            if (route === '/formdata') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            }
            else if (route === '/jsondata') {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(data));
            }
            else{
                res.end();
            }
        }
        catch(err){
            res.end(err);
            //send errorpage
        }
    }
    else{
        res.end();
    }
});

server.listen(port,host,()=>console.log(`${host}:${port} serving`));