window.GameManager = (function (window) {

    const mediator = new window.Mediator();
    const scena = new window.GameScena();

    class GameManager {
        constructor () {
            if (GameManager.__instance) {
                console.log('Grazinau sukurta GameManager _instanca');
                return GameManager.__instance;
            }
            console.log('Sukuriu GameManager _instanca pirma karta');
            GameManager.__instance = this;

            this.views = {
                greeting: new window.GreetingView('greeting'),
                waiting: new window.WaitingView('waiting'),
                game: new window.GameView('game'),
                finish: new window.FinishView('finish'),
            }

            this.gameController = new GameController();
            mediator.subscribe(EVENTS.RECEIVED_FROM_SERVER, this.receivedFromServer.bind(this));
            mediator.subscribe(EVENTS.GAME_START_PRESSED, this.gameStartPressed.bind(this))
        }

        start() {
            console.log('GameManager. Zaidimas prasidejo. Atsidaro pasisveikinimo langas');
            this.views.greeting.show();
        }

        gameStartPressed (username) {
            console.log('GameManager. Zaidejo vardas ' + username + '. Laukiam start signalo is serverio');
            mediator.unsubscribe(EVENTS.GAME_START_PRESSED, this.gameStartPressed.bind(this));

            this.views.greeting.hide();
            this.views.waiting.show();
            let message = {};
            message.setPlayerName = username;
            mediator.emit(EVENTS.SEND_TO_SERVER, message);
        }



        gameLoop(timestamp) {

            let gameControllerDiff = this.gameController.diff();
            if (gameControllerDiff.onSpace>0 || gameControllerDiff.onRight>0 || gameControllerDiff.onLeft>0) {
                mediator.emit(EVENTS.SEND_TO_SERVER, gameControllerDiff);
            }
            this.requestAnimationFrameID = requestAnimationFrame(this.gameLoop.bind(this));
        }

        receivedFromServer (message) {
            // console.log('manageris gavo zinute');
            // console.log(message);
            for (let prop in message) {
                this[prop](message[prop]);
            }
        }




        //*****************************Funkcijos kvieciamos is Serverio gavus objekto properti

        /**
         * Funkcija kviecia is serverio
         * @param state Naujas zaidimo stovis is serverio
         */
        onNewState (state) {
            scena.setState(state);
        }

        /**
         * Funkcija kvieciama is serverio
         */
        startGame() {
            console.log('Pasileido requestAnimationFrame');

            this.views.waiting.hide();
            this.views.game.show();
            this.requestAnimationFrameID = requestAnimationFrame(this.gameLoop.bind(this));
        }

        gameOver(msg) {
            console.log('Zaidimas baigtas ' + msg);

            cancelAnimationFrame(this.requestAnimationFrameID);
            this.views.game.hide();
            this.views.finish.show(msg);
        }
    }

    return GameManager;
})(window);