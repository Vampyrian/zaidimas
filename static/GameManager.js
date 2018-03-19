window.GameManager = (function (window) {

    class GameManager {
        constructor () {
            if (GameManager.__instance) {
                console.log('Grazinau sukurta GameManager _instanca');
                return GameManager.__instance;
            }
            console.log('Sukuriu GameManager _instanca pirma karta');
            GameManager.__instance = this;

            this.gameController = new GameController();
            this.magicTransport = new MagicTransport();

            this.startGame();
        }

        onNewState (data) {

        }

        startGame() {
            // this.requestAnimationFrameID = requestAnimationFrame(this.gameloop.bind(this));
            this.requestAnimationFrameID = setInterval(this.gameLoop.bind(this), 5000);
        }

        gameLoop() {
            let gameControllerDiff = this.gameController.diff();
            if (gameControllerDiff.onSpace>0 || gameControllerDiff.onRight>0 || gameControllerDiff.onLeft>0) {
                this.magicTransport.send(gameControllerDiff);
            }


        }

    }

    return GameManager;
})(window);