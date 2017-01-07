/**
 * @file Роутер, который содержит хендлеры сервера
 *
 * @param {Express} app - инстанс express
 */

/* global __dirname */

'use strict';

let express = require('express'),
    jade = require('jade');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send(jade.renderFile('./backend/views/main.jade'));
    });

    // Подключаем контроллеры
    require('./controllers/boards')(app);

    let rootFoldier = __dirname.split('/').slice(0, -1).join('/');

    app.use('/public', express.static(rootFoldier + '/public'));
};
