'use strict';

let requirejs = require('requirejs');

// Конфиг для require.
requirejs.config({
    baseUrl: './public/js',
    nodeRequire: require
});