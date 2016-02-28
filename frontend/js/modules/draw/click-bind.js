define('draw/click-bind', ['core/core', 'draw/controller', 'owner/ws', '/public/js/libs/jscolor.min.js'], function(NIRS, Controller, WS, colorPicker) {
    $(function() {
        var tools__item = $('.tools__item'),
            canvas = Controller.getCanvas();

        tools__item.on('click', function(e) {
            var type = _.last(e.target.className.split('_'));

            tools__item.removeClass('active');
            $(e.target).addClass('active');

            Controller.setDrawType(type);
        });

        $('.jscolor')[0].onchange = function() {
            var color = '#' + this.jscolor; // jscolor.toString() is necessary

            WS.send({
                type: 'EVENT',
                data: {
                    action: 'color-change',
                    color: color
                }
            });
        };

        bindDraw(canvas);
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

            // TODO: 1 function call
            WS.send({
                type: 'DRAW_START',
                data: {
                    shape: Controller.getDrawType(),
                    coords: startCoord
                }
            });
        });

        // TODO: _.throttle
        canvas.on('mouse:move', function(options) {
            var params = {
                left: options.e.clientX - canvasOffset.left - startCoord.left,
                top: options.e.clientY - canvasOffset.top - startCoord.top
            };

            // Не слать лишнее
            if(
                !isNaN(params.left) &&
                !isNaN(params.top) &&
                Controller.needDrawing()
            ) {
                WS.send({
                    type: 'DRAW_PROGRESS',
                    data: {
                        shape: Controller.getDrawType(),
                        coords: params
                    }
                });
            }
        });

        /**
         * только событие keypress позволяет увидеть введенный символ
         * но он не видит Backspace, поэтому нужен keydown
         *
         */
        $(document).on({
            keypress: function (e) {
                var text = String.fromCharCode(e.which);

                WS.send({
                    type: 'EVENT',
                    data: {
                        action: 'keypress',
                        text: text
                    }
                });
            },
            keydown: function (e) {
                if (e.which === 8) { // Backspace
                    WS.send({
                        type: 'EVENT',
                        data: {
                            action: 'keypress',
                            backspace: true
                        }
                    });

                    e.preventDefault();
                }
            }
        });

        canvas.on('mouse:up', function() {
            WS.send({
                type: 'DRAW_END'
            });
        });
    }
});
