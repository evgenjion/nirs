define('admin/click-bind', ['core/core'], function(NIRS) {
    $(function() {
        var _drawType = 'rectangle', // type of Object for drawing
            canvas = new fabric.Canvas('canvas');

        NIRS.on('set-draw-type', function(drawType) {
            _drawType = drawType;
        });

        NIRS.getDrawType = function() {
            return _drawType;
        };


        $('.tools__item').on('click', function(e) {
            // set draw type from class name
            NIRS.trigger('set-draw-type', _.last(e.target.className.split('_')));
        });

        bindDraw(canvas);

        // precent objects selection
        canvas.selection = false;

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
            objType = '',
            objParams = {},
            drawingObj;

        canvas.on('mouse:down', function(options) {
            objType = {
                'rectangle': 'Rect',
                'ellipse': 'Circle',
                'line': 'Line', // x1, x2, y1, y2
                'triangle': 'Triangle'
            }[NIRS.getDrawType()] || 'Rect';

            console.log(NIRS.getDrawType());

            objParams = {
                left: options.e.clientX - canvasOffset.left,
                top: options.e.clientY - canvasOffset.top,
                // 1 because of strange rendering by fabric.js with 0
                width: 1,
                height: 1
            };

            drawingObj = new fabric[objType](objParams);
            canvas.add(drawingObj);
        });

        // TODO: _.throttle
        canvas.on('mouse:move', function(options) {
            drawingObj && drawingObj.set({
                width: options.e.clientX - canvasOffset.left - objParams.left,
                height: options.e.clientY - canvasOffset.top - objParams.top
            });
        });

        canvas.on('mouse:up', function(options) {
            drawingObj = undefined;
        });
    }
});
