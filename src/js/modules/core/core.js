define('core/core', [], function() {

    // Observer pattern
    var NIRS = new EventSupport(),
        _drawType; // type of Object for drawing

    NIRS.on('set-draw-type', function(drawType) {
        _drawType = drawType;
    });

    NIRS.getDrawType = function() {
        return _drawType;
    };

    return NIRS;

    /**
     * @constructor
     *
     * @returns {EventSupport} Observer pattern
     */
    function EventSupport() {
        var _events = {};

        /**
         * @param e {string} – event name
         * @param h {function} – handler
         *
         * @returns {function} handler link
         */
        this.on = function(e, h) {
            if (!_events[e]) _events[e] = [];

            if(!_.contains(_events[e], h)) _events[e].push(h);

            return h;
        }

        /**
         *
         * Unbind function from event
         *
         * @param e {string} event name
         * @param h {Function} handler
         *
         * @returns {boolean} result status
         */
        this.un = function(e, h) {
            if (_.contains(_events[e], h)) {
                _events[e].splice(_events[e].indexOf(h));
                return true;
            }
            return false;
        }

        /**
         *
         * @param e {string} event name
         * @returns {boolean} result status
         */
        this.off = function(e) {
            if (!_.isEmpty(_events[e])) {
                _events[e].length = 0; // clear array

                return true;
            }
            return false;
        }
        /**
         *
         * @param e {string} event name
         * @param data {Object} params
         *
         * @returns {boolean} false if there is not function called
         */
        this.trigger = function(e, data) {
            if (Array.isArray(_events[e])) {
                _events[e].forEach(function(f){
                    f(data);
                });
                return true;
            }
            return false;
        }
    }
});

