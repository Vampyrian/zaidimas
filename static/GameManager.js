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

            this.gameController = new GameController();
            mediator.subscribe(EVENTS.RECEIVED_FROM_SERVER, this.onNewMessage.bind(this));
        }

        onNewState (state) {
            scena.setState(state);
        }

        startGame() {
            console.log('Pasileido requestAnimationFrame');
            this.requestAnimationFrameID = requestAnimationFrame(this.gameLoop.bind(this));
            var a = 8;
            // this.requestAnimationFrameID = setInterval(this.gameLoop.bind(this), 5000);
        }

        gameLoop(timestamp) {
            let gameControllerDiff = this.gameController.diff();
            if (gameControllerDiff.onSpace>0 || gameControllerDiff.onRight>0 || gameControllerDiff.onLeft>0) {
                mediator.emit(EVENTS.SEND_TO_SERVER, gameControllerDiff);
            }

            this.requestAnimationFrameID = requestAnimationFrame(this.gameLoop.bind(this));
        }

        onNewMessage (message) {
            // console.log('manageris gavo zinute');
            // console.log(message);
            for (let prop in message) {
                this[prop](message[prop]);
            }
        }

    }

    return GameManager;
})(window);