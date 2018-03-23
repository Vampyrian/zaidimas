window.GameScena = (function (window) {

    const canvasWidth = 480;
    const canvasHeight = 320;

    const paddleWidth = 80;
    const paddleHeight = 5;
    const paddleStep = 10;

    const ballRadius = 10;
    const ballStep = 10;

    const color = "#0095DD";

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const browserFPS = document.getElementById('browserFPS');
    const serverFPS = document.getElementById('serverFPS');
    const player1Name = document.getElementById('player-1-name');
    const player1Score = document.getElementById('player-1-score');
    const player2Name = document.getElementById('player-2-name');
    const player2Score = document.getElementById('player-2-score');

    class GameScena {
        constructor() {

            this.gameState = {
                player1: {
                    xpos: canvasWidth/2,
                    life: 4,
                    name: '',
                },
                player2: {
                    xpos: canvasWidth/2,
                    life: 4,
                    name: '',
                },
                ball: {
                    xpos: canvasWidth/2,
                    ypos: canvasHeight/2
                }
            }
        }

        setState(gameState) {
            this.gameState = gameState;
            this.render();
        }

        setServerFPS(fps) {
            serverFPS.innerText(fps);
        }

        setBrowserFPS(fps) {
            browserFPS.innerText(fps);
        }

        render() {
            player1Name.innerText = this.gameState.player1.name;
            player1Score.innerText = this.gameState.player1.life;
            player2Name.innerText = this.gameState.player2.name;
            player2Score.innerText = this.gameState.player2.life;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            this.drawPaddle((this.gameState.player1.xpos - paddleWidth/2), (canvasHeight - paddleHeight));
            this.drawPaddle((this.gameState.player2.xpos - paddleWidth/2), 0);
            this.drawBall(this.gameState.ball.xpos, this.gameState.ball.ypos);
        }

        drawPaddle(x, y) {
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