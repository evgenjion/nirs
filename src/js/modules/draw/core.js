define('draw/core', [], function() {
    /**
     * @typedef {Constructor} Shape
     *
     * @property {Function} update - updates shape params
     * @property {Function} getParams - returns shape params for Fabric.js (like fabric.Rect)
     * @property {Function} getStartParams - need for some shapes at start of drawing
     * @property {Function} end - calls on end of drawing/typing(for text)
     *
     */

    /**
      * @constructor Shape
      *
      * common interface for all shapes
      */
    var Shape = function (left, top) {};

    Shape.prototype.update = _.noop;
    Shape.prototype.getParams = _.noop;
    Shape.prototype.getStartParams = _.noop;
    Shape.prototype.end = _.noop;

    var Rect = function(left, top) {
        var width = 1,
            height = 1;

        this.update = function(params) {
            width = params.left;
            height = params.top;

            return this.getParams();
        };

        this.getParams = function() {
            return {
                width: width,
                height: height,
                left: left,
                top: top
            };
        };
    };
    extend(Rect, Shape);

    var Ellipse = function(left, top) {
        this.update = function(params) {
            return this.getParams(params.left, params.top);
        };

        this.getParams = function(x, y) {
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
        };
    };
    extend(Ellipse, Shape);

    var Line = function(left, top) {
        var x1 = left,
            y1 = top,
            x2 = left+1,
            y2 = top+1;

        this.update = function(params) {
            var x = params.left,
                y = params.top;

            x2 = x1 + x;
            y2 = y1 + y;

            return {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            };
        };

        this.getParams = function() {
            return [x1,y1,x2,y2];
        };

        this.getStartParams = function() {
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
    extend(Line, Shape);

    var Text = function(left, top) {
        this.__text = '|';

        this.update = function (params) {

            if (params.backspace) {
                this.__text = this.__text.slice(0, -2) + '|';
            } else {
                if(!params.text) return;

                this.__text = this.__text.slice(0, -1) + params.text + '|';
            }

            return {
                text: this.__text
            };
        };

        this.getParams = function () {
            return '|';
        };

        this.getStartParams = function () {
            return {
                left: left,
                top: top
            };
        };

        // TODO: fix
        this.end = function () {
            this.__text = this.__text.slice(0, -1);
        };
    };
    extend(Text, Shape);

    /**
     * returns params for drawing object(width, height for Rect, rx, ry for Ellipse)
     */
    function getObjParams(type) {
        // TODO: прокидывать стартовую позицию
        if (~['Rect', 'Triangle'].indexOf(type)) return Rect;

        if (type === 'Ellipse') return Ellipse;

        if (type === 'Line') return Line;

        if (type === 'Text') return Text;
    }

    return {
        /**
         * @param {Object} params
         * @param {Number} params.left x coord of mouseup
         * @param {Number} params.top y coord of mouseup
         */
        update: function(params) {
            // update was called before start(canvas hover before click)
            if (!this.drawingObj) return;

            var setParams = this.drawingObjParams.update(params);

            this.drawingObj.set(setParams);
        },

        /**
         * Object init, starts on mousedown
         *
         * @param {fabric.Canvas} canvas
         * @param {Object} params
         * @param {String} params.type draw type (Rectangle, Line, etc)
         * @param {Number} params.left left mouse coord
         * @param {Number} params.right right mouse coord
         */
        start: function (canvas, params) {
            var Shape = getObjParams(params.type),
                drawingObjParams = this.drawingObjParams = new Shape(params.left, params.top);

            // if there is need 2 arguments(f.e. Line)
            this.drawingObj = new fabric[params.type](drawingObjParams.getParams(), drawingObjParams.getStartParams());

            canvas.add(this.drawingObj);
        },

        /**
         * Calls on mouseup
         */
        end: function () {
            this.drawingObj = undefined;
        }
    };

    function extend(child, parent) {
        child.prototype = parent.prototype;
    }
});
