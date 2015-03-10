define('draw/click-bind', ['core/core', 'draw/core'], function(NIRS, draw) {
    $(function() {
        var DEFAULT_DRAW_TYPE = 'Rect',
            _drawType = DEFAULT_DRAW_TYPE, // type of Object for drawing
            canvas = new fabric.Canvas('canvas');

        NIRS.on('set-draw-type', function(drawType) {
            _drawType = drawType;
        });

        NIRS.getDrawType = function() {
            return _drawType;
        };

        $('.tools__item').on('click', function(e) {
            var type = _.last(e.target.className.split('_')),

                // convert from css class names to fabric objects
                fabricType = {
                    'rectangle': 'Rect',
                    'ellipse': 'Ellipse',
                    'line': 'Line', // x1, x2, y1, y2
                    'triangle': 'Triangle'
                }[type] || DEFAULT_DRAW_TYPE;

            // set draw type from class name
            NIRS.trigger('set-draw-type', fabricType);
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
            startCoord = {},
            drawingObj;

        canvas.on('mouse:down', function(options) {
            startCoord = {
                left: options.e.clientX - canvasOffset.left,
                top: options.e.clientY - canvasOffset.top,
            };

            drawingObj = draw.createDrawingObj(canvas, {
                type: NIRS.getDrawType(),
                left: startCoord.left,
                top: startCoord.top
            });
        });

        // TODO: _.throttle
        canvas.on('mouse:move', function(options) {
            drawingObj && drawingObj.update({
                left: options.e.clientX - canvasOffset.left - startCoord.left,
                top: options.e.clientY - canvasOffset.top - startCoord.top
            });
        });

        canvas.on('mouse:up', function(options) {
            drawingObj = undefined;
        });
    }
});
