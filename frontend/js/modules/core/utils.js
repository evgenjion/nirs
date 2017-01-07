define('core/utils', ['lodash'], function(_) {
    return {
        getCurrentBoardId: getCurrentBoardId,
        // Observer pattern
        EventSupport: EventSupport
    };

    function getCurrentBoardId() {
        var location = window.location.href.toString();

        return location.slice(location.lastIndexOf('/') + 1);
    }

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

            if (!_.includes(_events[e], h)) _events[e].push(h);

            return h;
        };

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
            if (_.includes(_events[e], h)) {
                _events[e].splice(_events[e].indexOf(h), 1);
                return true;
            }
            return false;
        };

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
        };
        /**
         *
         * @param e {string} event name
         * @param data {Object} params
         *
         * @returns {boolean} false if there is not function called
         */
        this.trigger = function(e, data) {
            if (Array.isArray(_events[e])) {
                _events[e].forEach(function(f) {
                    f(data);
                });
                return true;
            }
            return false;
        };
    }
});
