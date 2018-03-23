window.View = (function (window) {

    class View {

        constructor(id) {
            this._el = document.getElementById(id);
            if (!this._el) {
                this._el = document.createElement('div');
                document.body.appendChild(this._el);
            }
            this._destroyed = false;
            this.hide();
            this.mediator = new window.Mediator();
        }

        show() {
            if (!this._destroyed) {
                this._el.hidden = false;
            }
        }

        hide() {
            if (!this._destroyed) {
                this._el.hidden = true;
            }
        }

        destroy() {
            if (this._destroyed) {
                return;
            }
            this.hide();
            document.body.removeChild(this._el);
            this._el = null;
            this._destroyed = true;
        }
    }

    return View;
})(window);