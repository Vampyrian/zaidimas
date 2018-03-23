window.Mediator = (function (window) {

    /**
     * Event Bus
     */
    class Mediator {

        constructor() {
            if (Mediator.__instance) {
                console.log('Grazinau Madiator instance');
                return Mediator.__instance;
            }
            console.log('Sukuriau Madiator instance');
            Mediator.__instance = this;
        }

        subscribe(eventName, func) {
            if(!this.__eventHandler) {
                this.__eventHandler = {};
            }
            if(!this.__eventHandler[eventName]) {
                this.__eventHandler[eventName] = [];
            }
            console.log('Pasirasiau ivikiui mediatoiuje: ' + eventName);
            this.__eventHandler[eventName].push(func);
        }

        unsubscribe(eventName, func) {
            let handler = this.__eventHandler && this.__eventHandler[eventName];
            if (!handler) {
                return;
            } else {
                for (let i=0; i<handler.length; i++) {
                    if (handler[i] == func) {
                        handler.splice(i--, 1);
                        console.log('Atsirasiau nuo ivikio mediatoriuje: ' + eventName);
                    }
                }
            }
        }

        emit(eventName, payloud = null) {
            // console.log('buvo iskvieta mediatoriaus emit funkcija');
            if (!this.__eventHandler || !this.__eventHandler[eventName]) {
                return;
            }
            let handler = this.__eventHandler[eventName];
            for (let i=0; i<handler.length; i++){
                handler[i].apply(this, [].slice.call(arguments, 1));
                // console.log('Kvieciu funcija is mediatoriaus');
            }
        }
    }

    return Mediator;
})(window);