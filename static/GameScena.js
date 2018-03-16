window.GameScena = (function (window) {

    const canvasWidth = 480;
    const canvasHeight = 320;

    const paddleWidth = 80;
    const paddleHeight = 10;
    const paddleStep = 10;

    const ballRadius = 10;
    const ballStep = 10;

    const color = "#0095DD";

    class GameScena {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');

            this.gameState = {
                player1: {
                    xpos: canvasWidth/2,
                },
                player2: {
                    xpos: canvasWidth/2,
                }
            }

            this.setState(this.gameState);
            this.render();
        }

        setState(gameState) {
            this.gameState = gameState;
        }

        render() {
            let ctx = this.ctx;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            let player1x = this.gameState.player1.xpos - paddleWidth/2;
            let player1y = canvasHeight - paddleHeight;
            let player2x = this.gameState.player2.xpos - paddleWidth/2;
            let player2y = paddleHeight;
            this.drawPaddle(player1x, player1y);
            this.drawPaddle(player2x, player2y);
        }

        drawPaddle(x, y) {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.rect(x, y, paddleWidth, paddleHeight);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }

    return GameScena;
})(window);