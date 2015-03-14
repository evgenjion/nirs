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
            }
        };
    };

    var Ellipse = function(left, top) {
        var rx = 1,
            ry = 1;

        return {
            update: function(x, y) {
                rx = x;
                ry = y;

                return this.getParams();
            },
            getParams: function() {
                return {
                    rx: rx,
                    ry: ry,
                    left: left + rx/2,
                    top: top + ry/2
                };
            }
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
                x2 = x;
                y2 = y;
            },
            getParams: function() {
                return {
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
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
            console.log(params.type);
            var drawingObjParams = getObjParams(params.type)(params.left, params.top),
                drawingObj = new fabric[params.type](drawingObjParams.getParams());

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
