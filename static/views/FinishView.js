window.FinishView = (function (window) {

    class FinishView extends window.View{
        constructor(id) {
            super(id);

            this.resultsElement = document.getElementById('resultsElement');
        }

        show(text) {
            super.show();
            let message = text || '';
            this.resultsElement.innerText = message;
        }
    }






    return FinishView;
})(window);