'use strict'
const debug = require('debug')('game');

//Zaidimo logika serveryje

module.exports = class Game {

    constructor () {
        debug('Sukuriu zaidimo instanca');
        this.player1 = null;
        this.player2 = null;
        this.inPlay = false;
        this.gameState = null;
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
        } else {
            debug('Nebera vietos naujiems zaidejams');
            return;
        }

        player.id = id;
        debug('Pridejome nauja zaideja vardu: ' + id);

        player.on('message', (msg)=>{
            debug('sustra funkcija message');
            this.onNewMessage(id, msg);
        })

        player.on('close', (msg)=>{
            debug('sustra funkcija close');
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
    }

    /**
     * Funkcija kvieciama kai gaunama nauja zinute
     * @param id Zaidejo vardas is kurio gavome zinute arba player1 arba player2
     * @param msg Zinutes tekstas
     */
    onNewMessage (id, msg) {
        debug('Gavau nauja zinute is ' + id + ' ir tekstu ' + msg);
        if (id == 'player1') {
            this.player2.send(msg);
        } else {
            this.player1.send(msg);
        }
    }

    onLeft(id){
        switch (id) {
            case 'player1' : {

            }
            case 'player2' : {

            }
        }
    }

    onRight(id) {
        switch (id) {
            case 'player1' : {

            }
            case 'player2' : {

            }
        }
    }

    onFire(id) {
        switch (id) {
            case 'player1' : {

            }
            case 'player2' : {

            }
        }
    }

    startNewGame () {
        this.gameState = {
            player1: {
                xpos: 0,
            },
            player2: {
                xpos: 0,
            }
        }
    }





}
