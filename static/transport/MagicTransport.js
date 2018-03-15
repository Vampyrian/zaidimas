window.MagicTransport = (function (windows) {

    class MagicTransport {

        constructor() {
            if (MagicTransport.__instance) {
                console.log('Grazinau sukurta MagicTransport _instanca');
                return MagicTransport.__instance;
            }
            console.log('Sukuriu MagicTransport _instanca pirma karta');
            MagicTransport.__instance = this;

            //Atidarau web socket susijungima
            const address = ['https:'].includes(location.protocol)
                ? `wss://${location.host}/ws`
                : `ws://${location.host}/ws`;

            console.log('WebSocketo adresas: ' + address);

            this.ws = new WebSocket(address);

            this.ws.onopen = function (event) {

                console.log('Atsidare WebSocket susijungimas su serveriu');

                this.ws.onmessage = this.onNewMessage.bind(this);

                this.ws.onclose = function (onCloseData) {
                    if (onCloseData.wasClean) {
                        alert('Uzdarytas sujungimas svariai');
                    } else {
                        console.log('Kazkodel nutruko rysis'); //
                    }
                    console.log('Kodas: ' + onCloseData.code + ' Priezastis: ' + onCloseData.reason);
                }

                this.ws.onerror = function (onErrorData) {
                    console.log('Atsitiko klaida' + onErrorData);
                }
            }.bind(this)
        }

        onNewMessage(newMessage) {
            let messageText = newMessage.data;
            let message = JSON.parse(messageText);
            console.log('Gavau nauja zinute is serverio po parserio');
            console.dir(message);
        }

        send(data) {
            console.log('Isiunciu nauja zinute serveriui');
            this.ws.send(JSON.stringify(data))
        }
    }

    return MagicTransport;
})(window);