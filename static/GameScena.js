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
        constructor() {
            this.canvas = document.getElementById('myCanvas');
            this.ctx = this.canvas.getContext('2d');

            this.fpsDisplay = document.getElementById('fpsDisplay');

            this.gameState = {
                player1: {
                    xpos: canvasWidth/2,
                },
                player2: {
                    xpos: null,
                },
                ball: {
                    xpos: null,
                    ypos: null
                }
            }
        }

        setState(gameState) {
            this.gameState = gameState;
        }

        setFPS(fps) {
            this.fpsDisplay.innerText(fps);
        }

        render() {
            let ctx = this.ctx;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            this.drawPaddle((this.gameState.player1.xpos - paddleWidth/2), (canvasHeight - paddleHeight));
            this.drawPaddle((this.gameState.player2.xpos - paddleWidth/2), paddleHeight);
            this.drawBall(this.gameState.ball.xpos, this.gameState.ball.ypos);
        }

        drawPaddle(x, y) {
            let ctx = this.ctx;
            ctx.beginPath();
            ctx.rect(x, y, paddleWidth, paddleHeight);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

        drawBall (x, y) {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }

    return GameScena;
})(window);