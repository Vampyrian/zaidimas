'use strict'
const debug = require('debug')('game');

//Zaidimo logika serveryje

const canvasWidth = 480;
const canvasHeight = 320;

const paddleWidth = 80;
const paddleHeight = 10;
const paddleStep = 10;

const ballRadius = 10;
const ballStep = 10;


module.exports = class Game {

    constructor () {
        debug('Sukuriu zaidimo instanca');
        this.player1 = null;
        this.player2 = null;
        this.inPlay = false;
        this.gameState = null;
        this.interval = null;
    }

    /**
     * Funkcija kvieciam kai reikia sukurti nauja zaideja
     * @param player WebSocketo susijungimo instancas
     */
    addNewPlayer (player) {
        let id = null;
        if (!this.player1) {
            this.player1 = player;
            id = 'player1';
        } else if (!this.player2) {
            this.player2 = player;
            id = 'player2';
            this.startNewGame();
        } else {
            debug('Nebera vietos naujiems zaidejams');
            return;
        }

        player.id = id;
        debug('Pridejome nauja zaideja vardu: ' + id);

        player.on('message', (msg)=>{
            this.onNewMessage(id, msg);
        })

        player.on('close', (msg)=>{
            this.stopGame(id);
        })
    }

    /**
     * Funkcija kvieciama kai zaidejas iseina is zaidimo
     * @param id Zaidejo vardas arba player1 arba player2
     */
    stopGame (id) {
        debug('Uzdarome zaidima nes to nori ' + id);

        if (this.player1) {
            this.player1.close();
        }
        if (this.player2) {
            this.player2.close();
        }
        this.player1 = null;
        this.player2 = null;
        this.gameState = null;
        this.inPlay = false;
        if(this.interval) {
            clearInterval(this.interval);
        }
    }

    /**
     * Funkcija kvieciama kai gaunama nauja zinute
     * @param id Zaidejo vardas is kurio gavome zinute arba player1 arba player2
     * @param msg Zinutes tekstas
     */
    onNewMessage (id, msg) {
        debug('Gavau nauja zinute is ' + id + ' ir tekstu ' + msg);
        let message = JSON.parse(msg);

        for (let prop in message) {
            if (message[prop] > 0) {
                this[prop](id, message[prop]);
            }
        }
    }

    onLeft(id, count){
        switch (id) {
            case 'player1' : {
                debug('pirmas i left' + id);
                if (this.gameState) {
                    this.gameState.player1.xpos = this.gameState.player1.xpos - paddleStep * count;
                    if ((this.gameState.player1.xpos - paddleWidth/2) < 0 ) {
                        this.gameState.player1.xpos = paddleWidth/2;
                    }
                }
                break;
            }
            case 'player2' : {
                debug('antras i left' + id);
                if (this.gameState) {
                    this.gameState.player2.xpos = this.gameState.player2.xpos - paddleStep * count;
                    if ((this.gameState.player2.xpos - paddleWidth/2) < 0 ) {
                        this.gameState.player2.xpos = paddleWidth/2;
                    }
                }
                break;
            }
        }
        console.dir(this.gameState);
    }

    onRight(id, count) {
        switch (id) {
            case 'player1' : {
                debug('pirmas i right' + id);
                if (this.gameState) {
                    this.gameState.player1.xpos = this.gameState.player1.xpos + paddleStep * count;
                    if ((this.gameState.player1.xpos + paddleWidth/2) > canvasWidth ) {
                        this.gameState.player1.xpos = canvasWidth - paddleWidth/2;
                    }
                }
                break;
            }
            case 'player2' : {
                debug('antras i right' + id);
                if (this.gameState) {
                    this.gameState.player2.xpos = this.gameState.player2.xpos + paddleStep * count;
                    if ((this.gameState.player2.xpos + paddleWidth/2) > canvasWidth ) {
                        this.gameState.player2.xpos = canvasWidth - paddleWidth/2;
                    }
                }
                break;
            }
        }
        console.dir(this.gameState);
    }

    onSpace(id, count) {
        switch (id) {
            case 'player1' : {

            }
            case 'player2' : {

            }
        }
    }

    startNewGame () {
        this.inPlay = true;
        this.gameState = {
            player1: {
                xpos: canvasWidth/2,
            },
            player2: {
                xpos: canvasWidth/2,
            }
        }
        this.interval = setInterval(()=>this.gameLoop(), 30);
    }

    gameLoop() {
        if(this.gameState) {
            this.player1.send(JSON.stringify(this.prepareToPlayer1()));
            this.player2.send(JSON.stringify(this.prepareToPlayer2()));
        }
    }

    prepareToPlayer1() {
        let state = JSON.parse(JSON.stringify(this.gameState));

        state.player2.xpos = state.player2.xpos;
        return state;
    }

    prepareToPlayer2() {

        let state2 = {}
        state2.player1 = {};
        state2.player2 = {};
        state2.player1.xpos = this.gameState.player2.xpos;
        state2.player2.xpos = this.gameState.player1.xpos;

        return state2;
    }

    send() {

    }
}
