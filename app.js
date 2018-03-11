'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log('gavau pirma');
    console.log(req.method, req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port);
console.log('serveris pasileido ant porto: ' + port);
