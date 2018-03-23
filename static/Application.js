window.Application = (function (window) {

    class Application {
        constructor () {
            this.views = {
                greeting: new window.GreetingView(),
                waiting: new window.WaitingView(),
                game: new window.GameView(),
                finish: new window.FinishView(),
            }

        }

        start() {
            console.log('Application. Zaidimas prasidejo');
            this.views.greeting.show();

        }
    }

    return Application;
})(window);