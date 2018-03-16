window.GameController = (function (window) {

    // const mediator = new Mediator();

    class GameController {

        constructor() {
            if (GameController.__instance) {
                console.log('Sukuriu GameController instance');
                return GameController.__instance;
            }
            console.log('Grazinau GameController instance');
            GameController.__instance = this;

            this.rightPressed = false;
            this.leftPressed = false;
            this.spacePressed = false;

            this.mediator = new Mediator();

            document.addEventListener('keydown', this.keyDownHandler.bind(this));
            document.addEventListener('keyup', this.keyUpHandler.bind(this));
        }

        keyDownHandler(e) {
            if(e.keyCode == 39) {
                this.rightPressed = true;
                this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onRight' : true});
            }
            else if(e.keyCode == 37) {
                this.leftPressed = true;
                this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onLeft' : true});
            }
            else if(e.keyCode == 32) {
                this.spacePressed = true;
                this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onFire' : true});
            }
        }

        keyUpHandler(e) {
            if(e.keyCode == 39) {
                this.rightPressed = false;
                // this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onRight' : false});
            }
            else if(e.keyCode == 37) {
                this.leftPressed = false;
                // this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onLeft' : false});
            }
            else if(e.keyCode == 32) {
                this.spacePressed = false;
                // this.mediator.emit(EVENTS.GAME_CONTROLLER_EVENT, {'onFire' : false});
            }
        }

        destroy() {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }
    }

    return GameController;
})(window);