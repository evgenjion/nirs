requirejs.config({
    paths: {
        lodash: '/public/js/libs/lodash/dist/lodash.min.js',
        fabric: '/public/js/libs/fabric.js/dist/fabric.js',
        zepto: '/public/js/libs/zepto.min.js'
    }
});

require(['draw/click-bind'], function() {});
