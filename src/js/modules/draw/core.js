define('draw/core', [], function() {

    // TODO: extend
    var Rect = function(left, top) {
        var width = 1,
            height = 1;

        return {
            update: function(x, y) {
                width = x;
                height = y;

                return this.getParams();
            },
            getParams: function() {
                return {
                    width: width,
                    height: height,
                    left: left,
                    top: top
                };
            },
            getStartParams: _.noop
        };
    };

    var Ellipse = function(left, top) {
        var rx = 1,
            ry = 1;

        return {
            update: function(x, y) {
                return this.getParams(x, y);
            },
            getParams: function(x, y) {
                var rx = x/2,
                    ry = y/2,

                    // when mouse to the left than at start of drawing
                    isInversed = rx < 0;

                // prevents error with negative radius
                rx = Math.abs(rx);

                return {
                    rx: rx,
                    ry: ry,
                    left: left - (isInversed ? rx*2 : 0),
                    top: top
                };
            },
            getStartParams: _.noop
        };
    };

    // TODO: correct params
    var Line = function(left, top) {
        var x1 = left,
            y1 = top,
            x2 = left+1,
            y2 = top+1;

        return {
            update: function(x, y) {
                // TODO: + or - depends on position of x or y
                x2 = x1 + x;
                y2 = y1 + y;

                // TODO: Определить, почему fabricjs сдвигает параметр left, и top, при неизменных x1, y1
                return {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2
                };
            },
            getParams: function() {
                return [x1,y1,x2,y2];
            },
            getStartParams: function() {
                return {
                    left: x1,
                    top: y1,
                    fill: 'black',
                    stroke: 'black',
                    strokeWidth: 5,
                    selectable: false
                };
            }
        };
    }

    /**
     * returns params for drawing object(width, height for Rect, rx, ry for Ellipse)
     */
    function getObjParams(type) {
        // TODO: прокидывать стартовую позицию
        if (~['Rect', 'Triangle'].indexOf(type)) return Rect;

        if (type === 'Ellipse') return Ellipse;

        if (type === 'Line') return Line;
    };

    return {
        /**
         * @param {Object} params
         * @param {String} params.type type of fabric object(Rect, Triangle...)
         * @param {Number} params.left x coord of mousedown
         * @param {Number} params.top y coord of mousedown
         *
         */
        createDrawingObj: function(canvas, params) {
            var drawingObjParams = getObjParams(params.type)(params.left, params.top),
                fabricParams = drawingObjParams.getParams(),

                // if there is need 2 arguments(f.e. Line)
                drawingObj = new fabric[params.type](drawingObjParams.getParams(), drawingObjParams.getStartParams());

            canvas.add(drawingObj);

            return {
                /**
                 * @param {Object} params
                 * @param {Number} params.left x coord of mouseup
                 * @param {Number} params.top y coord of mouseup
                 */
                update: function(params) {
                    var setParams = drawingObjParams.update(params.left, params.top);

                    drawingObj.set(setParams);
                }
            };
        }
    };
});
