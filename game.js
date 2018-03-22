'use strict'
const debug = require('debug')('game');

//Zaidimo logika serveryje

const canvasWidth = 480;
const canvasHeight = 320;

const paddleWidth = 80;
const paddleHeight = 5;
const paddleStep = 10;

const ballRadius = 10;
const ballStep = 10;
let ballSpeedX = 2;
let ballSpeedY = -2;


module.exports = class Game {

    constructor () {
        debug('Sukuriu zaidimo instanca');
        this.player1 = null;
        this.player2 = null;
        this.ballMove = false;
        this.ballOwner = 'player1';
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
            debug('Pridedam pirma zaideja');
            this.player1 = player;
            id = 'player1';
        } else if (!this.player2) {
            debug('Pridedam antra zaideja');
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
        });

        player.on('close', (msg)=>{
            this.stopGame(id);
        });
        // console.dir(this);
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
        this.ballMove = false;
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
                debug('Zaidejas ' + id + ' pajudejo i kaire');
                if (this.gameState) {
                    this.gameState.player1.xpos = this.gameState.player1.xpos - paddleStep * count;
                    if ((this.gameState.player1.xpos - paddleWidth/2) < 0 ) {
                        this.gameState.player1.xpos = paddleWidth/2;
                    }
                }
                break;
            }
            case 'player2' : {
                debug('Zaidejas ' + id + ' pajudejo i kaire');
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

    onRight(id, count) {
        switch (id) {
            case 'player1' : {
                debug('Zaidejas ' + id + ' pajudejo i desine');
                if (this.gameState) {
                    this.gameState.player1.xpos = this.gameState.player1.xpos + paddleStep * count;
                    if ((this.gameState.player1.xpos + paddleWidth/2) > canvasWidth ) {
                        this.gameState.player1.xpos = canvasWidth - paddleWidth/2;
                    }
                }
                break;
            }
            case 'player2' : {
                debug('Zaidejas ' + id + ' pajudejo i desine');
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

    onSpace(id, count) {
        switch (id) {
            case 'player1' : {
                if(this.ballOwner == 'player1') {
                    this.ballMove = true;
                }
                break;
            }
            case 'player2' : {
                if(this.ballOwner == 'player2') {
                    this.ballMove = true;
                }
                break;
            }
        }
    }

    startNewGame () {
        debug('Pasileido naujas zaidimas');
        this.gameState = {
            player1: {
                xpos: canvasWidth/2,
                life: 3,
            },
            player2: {
                xpos: canvasWidth/2,
                life: 3,
            },
            ball: {
                xpos: canvasWidth/2,
                ypos: canvasHeight - paddleHeight - ballRadius,
            }
        };
        this.interval = setInterval(()=>this.gameLoop(), 20);
    }

    gameLoop() {
        // debug('Pasileido gameLoop');
        this.calculateBallPosition();
        this.collisionDetection();
        if(this.gameState) {
            this.send('player1', this.prepareToPlayer1());
            this.send('player2', this.prepareToPlayer2());
        }
    }

    prepareToPlayer1() {
        // debug('Pasileido prepareToPlayer1');
        let state = {};
        state.player1 = {};
        state.player2 = {};
        state.ball = {};
        state.player1.xpos = this.gameState.player1.xpos;
        state.player1.life = this.gameState.player1.life;
        state.player2.xpos = this.gameState.player2.xpos;
        state.player2.life = this.gameState.player2.life;
        state.ball.xpos = this.gameState.ball.xpos;
        state.ball.ypos = this.gameState.ball.ypos;
        return {'onNewState': state};
    }

    prepareToPlayer2() {
        // debug('Pasileido prepareToPlayer2');
        let state = {};
        state.player1 = {};
        state.player2 = {};
        state.ball = {};
        state.player1.xpos = canvasWidth - this.gameState.player2.xpos;
        state.player1.life = this.gameState.player2.life;
        state.player2.xpos = canvasWidth - this.gameState.player1.xpos;
        state.player2.life = this.gameState.player1.life;
        state.ball.xpos = canvasWidth - this.gameState.ball.xpos;
        state.ball.ypos = canvasHeight - this.gameState.ball.ypos;

        return {'onNewState' : state};
    }

    calculateBallPosition() {
        if (!this.ballMove) {
            switch (this.ballOwner) {
                case 'player1' : {
                    let x = this.gameState.player1.xpos;
                    this.gameState.ball.xpos = x;
                    this.gameState.ball.ypos = canvasHeight - paddleHeight - ballRadius;
                    break;
                }
                case 'player2' : {
                    let x = this.gameState.player2.xpos;
                    this.gameState.ball.xpos = x;
                    this.gameState.ball.ypos = paddleHeight + ballRadius;
                    break;
                }
            }
        }

        if ((this.gameState.ball.xpos > canvasWidth - ballRadius) || (this.gameState.ball.xpos < ballRadius)) {
            ballSpeedX = -ballSpeedX;
        }

        this.gameState.ball.xpos += ballSpeedX;
        this.gameState.ball.ypos += ballSpeedY;
    }

    collisionDetection () {
        if (this.gameState.ball.ypos > (canvasHeight - paddleHeight- ballRadius)
            && (this.gameState.ball.xpos < this.gameState.player1.xpos + paddleWidth/2)
                && (this.gameState.ball.xpos > this.gameState.player1.xpos - paddleWidth/2)) {
            ballSpeedY = -ballSpeedY;
        }
        if (this.gameState.ball.ypos < (paddleHeight + ballRadius)
            && (this.gameState.ball.xpos < this.gameState.player2.xpos + paddleWidth/2)
                && (this.gameState.ball.xpos > this.gameState.player2.xpos - paddleWidth/2)) {
            ballSpeedY = -ballSpeedY;
        }

        if (this.gameState.ball.ypos + ballRadius >= canvasHeight) {

            this.ballMove = false;
            this.ballOwner = 'player2';
            ballSpeedY = Math.abs(ballSpeedY);
            this.gameState.player1.life--;
        }

        if(this.gameState.ball.ypos - ballRadius <= 0) {

            this.ballMove = false;
            this.ballOwner = 'player1';
            ballSpeedY = Math.abs(ballSpeedY) * -1;
            this.gameState.player2.life--;
        }
    }

    send(player, message) {
        this[player].send(JSON.stringify(message));
    }
}
