define('draw/click-bind', ['core/core', 'draw/core'], function(NIRS, draw) {
    $(function() {
        var DEFAULT_DRAW_TYPE = 'Rect',
            _drawType = DEFAULT_DRAW_TYPE, // type of Object for drawing
            tools__item = $('.tools__item'),
            canvas = new fabric.Canvas('canvas');

        NIRS.on('set-draw-type', function(drawType) {

            if (drawType === 'Move') {
                canvas.selection = true;
            } else {
                canvas.selection = false;
            }

            _drawType = drawType;
        });

        NIRS.getDrawType = function() {
            return _drawType;
        };

        tools__item.on('click', function(e) {
            var type = _.last(e.target.className.split('_')),

                // convert from css class names to fabric objects
                fabricType = {
                    'rectangle': 'Rect',
                    'ellipse': 'Ellipse',
                    'line': 'Line', // x1, x2, y1, y2
                    'triangle': 'Triangle',
                    'cursor': 'Cursor',
                    'move': 'Move'
                }[type] || DEFAULT_DRAW_TYPE;

            tools__item.removeClass('active');
            $(e.target).addClass('active');

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
            // not needed draw if drawType === 'Move'
            drawType,
            drawingObj;

        canvas.on('mouse:down', function(options) {
            drawType = NIRS.getDrawType();

            if (notNeedDrawing(drawType)) return;

            startCoord = {
                left: options.e.clientX - canvasOffset.left,
                top: options.e.clientY - canvasOffset.top
            };

            drawingObj = draw.createDrawingObj(canvas, {
                type: drawType,
                left: startCoord.left,
                top: startCoord.top
            });
        });

        // TODO: _.throttle
        canvas.on('mouse:move', function(options) {
            if (notNeedDrawing(drawType)) return;

            drawingObj && drawingObj.update({
                left: options.e.clientX - canvasOffset.left - startCoord.left,
                top: options.e.clientY - canvasOffset.top - startCoord.top
            });
        });

        canvas.on('mouse:up', function(options) {
            drawingObj = undefined;
        });
    }

    /**
     * @param {String} drawType
     *
     * @return {Boolean} true if not needing drawing
     */
    function notNeedDrawing(drawType) {
        return ~['Move', 'Cursor'].indexOf(drawType);
    }
});
