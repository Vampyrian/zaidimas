window.GameController = (function (window) {

    const bandymas = 0;

    class GameController {

        constructor() {
            if (GameController.__instance) {
                console.log('Grazinau GameController instance');
                return GameController.__instance;
            }
            console.log('Sukuriu GameController instance');
            GameController.__instance = this;

            this.rightPressed = 0;
            this.leftPressed = 0;
            this.spacePressed = 0;

            document.addEventListener('keydown', this.keyDownHandler.bind(this));
        }

        /**
         * Skaiciuojam koks klavisas buvo nuspaustas
         * @param e
         */
        keyDownHandler(e) {
            if(e.keyCode == 39) {
                this.rightPressed ++;
            }
            else if(e.keyCode == 37) {
                this.leftPressed ++;
            }
            else if(e.keyCode == 32) {
                this.spacePressed ++;
            }
        }

        /**
         * Siunciam tik paspaustu klavisu skirtuma, kad nestumdyti pirmyn atgal be reikalo
         * @returns {{onLeft: number|*, onRight: number|*, onSpace: number}}
         */
        diff() {
            let result = {};
            // debugger;
            if (this.rightPressed > this.leftPressed) {
                this.rightPressed = this.rightPressed - this.leftPressed;
                result.onRight = this.rightPressed;
                this.rightPressed = 0;
                this.leftPressed = 0;
            }
            if (this.rightPressed < this.leftPressed) {
                this.leftPressed = this.leftPressed - this.rightPressed;
                result.onLeft = this.leftPressed;
                this.rightPressed = 0;
                this.leftPressed = 0;
            }
            if (this.spacePressed > 0) {
                result.onSpace = this.spacePressed;
            }

            this.spacePressed = 0;
            this.rightPressed = 0;
            this.leftPressed = 0;

            return result;
        }

        destroy() {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }

    return GameController;
})(window);