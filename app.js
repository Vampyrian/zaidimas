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

// https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC


var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC', true);

xhr.send();

if (xhr.status != 200) {
    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
} else {
    alert( xhr.responseText ); // responseText -- текст ответа.
}





