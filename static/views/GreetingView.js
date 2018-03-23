window.GreetingView = (function (windows) {

    class GreetingView extends window.View{
        constructor (id) {
            super(id);
            this.username = document.getElementById('username');
            this.startGameButton = document.getElementById('start-game');
            this.startGameButton.addEventListener('click', this.startGame.bind(this));
        }

        startGame(event) {
            event.preventDefault();
            let username = (this.username.value || '').trim();
            if (!username) {
                alert('Jūs neivedėte savo vardo');
                this.username.value = '';
                return;
            }
            this.mediator.emit(EVENTS.GAME_START_PRESSED, username);
        }
    }

    return GreetingView;
})(window);