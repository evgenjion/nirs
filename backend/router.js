/**
 * @file Роутер, который содержит хендлеры сервера
 *
 * @param {Express} app - инстанс express
 */

var express = require('express'),
    jade = require('jade');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send(jade.renderFile('views/main.jade'));
    });

    // Подключаем контроллеры
    require('./controllers/boards')(app);

    var rootFoldier = __dirname.split('/').slice(0, -1).join('/');

    app.use('/public', express.static(rootFoldier + '/public'));

};