define('draw/click-bind', ['core/core', 'draw/controller', 'owner/ws'], function(NIRS, Controller, WS) {
    $(function() {
        var tools__item = $('.tools__item'),
            canvas = Controller.getCanvas();

        tools__item.on('click', function(e) {
            var type = _.last(e.target.className.split('_'));

            tools__item.removeClass('active');
            $(e.target).addClass('active');

            Controller.setDrawType(type);
        });

        bindDraw(canvas);

        // prevent objects selection
        canvas.selection = false;

        // TODO: поставить нормальный таймер
        setInterval(function() {
            canvas.renderAll();
        }, 15);
    });

    /**
     * Bind handlers to canvas events
     *
     * @param {fabric.Canvas} canvas
     */
    function bindDraw(canvas) {
        // params of canvas object
        var canvasOffset = $(canvas.upperCanvasEl).offset(),
            startCoord = {};

        canvas.on('mouse:down', function(options) {
            startCoord = {
                left: options.e.clientX - canvasOffset.left,
                top: options.e.clientY - canvasOffset.top
            };

            WS.drawStart(Controller.getDrawType(), startCoord);
            Controller.drawingStart(startCoord);
        });

        // TODO: _.throttle
        canvas.on('mouse:move', function(options) {
            var params = {
                left: options.e.clientX - canvasOffset.left - startCoord.left,
                top: options.e.clientY - canvasOffset.top - startCoord.top
            };

            // Не слать лишнее
            if(!isNaN(params.left) && !isNaN(params.top) && Controller.needDrawing()) {
                WS.drawProgress(Controller.getDrawType(), params);
                Controller.drawingUpdate(params);
            }
        });

        /**
         * только событие keypress позволяет увидеть введенный символ
         * но он не видит Backspace, поэтому нужен keydown
         *
         */
        $(document).on({
            // TODO: WS
            keypress: function (e) {
                Controller.drawingUpdate({
                    text: String.fromCharCode(e.which)
                });
            },
            keydown: function (e) {
                // Backspace
                if (e.which === 8) Controller.drawingUpdate({
                    backspace: true
                });
            }
        });

        canvas.on('mouse:up', function() {
            Controller.drawingEnd();
            WS.endProgress();
        });
    }
});
