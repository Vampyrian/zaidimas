'use strict';

const port = process.env.PORT || 3001;
const debug = require('debug')('server');



const ws = require('express-ws');

const express = require('express');
const app = express();
const expressWs = ws(app);

var klientai = expressWs.getWss().clients;

debug('Paleidziam stati HTML');
app.use('/', express.static('./static'));

app.ws('/ws', function (ws, req) {
    debug('Atsidare WS sujungimas');
    ws.on('message', function (msg) {
        debug('Gavau zinute' + msg);
        expressWs.getWss().clients.forEach( function (client) {
            client.send(msg);
        })
        // ws.send(msg);
    })


})


// app.get('/zaidimas', function (req, res) {
//     debug('bandau debuginga');
//     res.send('isijunge zaidimas');
// })

app.listen(port, () => console.log('Express serveris pasileido'));




