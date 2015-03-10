define('draw/core', [], function() {

    /**
     * returns params for drawing object(width, height for Rect, rx, ry for Ellipse)
     */
    function getObjParams(type) {
        if (~['Rect', 'Triangle'].indexOf(type)) return {
            x: 'width',
            y: 'height'
        };

        if (type === 'Ellipse') return {
            x: 'rx',
            y: 'ry'
        };
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
            var drawingObjParams = getObjParams(params.type),
                drawingObj;

            // 1 because of strange rendering by fabric.js with width === 0
            params[drawingObjParams.x] = 1;
            params[drawingObjParams.y] = 1;

            drawingObj = new fabric[params.type](params);

            canvas.add(drawingObj);

            return {
                /**
                 * @param {Object} params
                 * @param {Number} params.left x coord of mouseup
                 * @param {Number} params.top y coord of mouseup
                 */
                update: function(params) {
                    var setParams = {};

                    setParams[drawingObjParams.x] = params.left;
                    setParams[drawingObjParams.y] = params.top;

                    drawingObj.set(setParams);
                }
            };
        }
    };
});
