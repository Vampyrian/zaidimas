'use strict';

const port = process.env.PORT || 3001;
const debug = require('debug')('server');

const express = require('express');
const app = express();
const ws = require('express-ws');
const expressWs = ws(app);

const Game = require('./game');
let game = new Game();

debug('Paleidziam statini HTML');
app.use('/', express.static('./static'));

app.ws('/ws', function (ws, req) {
    debug('Atsidare WS sujungimas');
    game.addNewPlayer(ws);
})


app.listen(port, () => console.log('Express serveris pasileido'));




