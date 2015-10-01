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

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/draw', (req, res) => {
        var session = req.session;

        if (session.viewTimes === undefined)
            session.viewTimes = 0;
        else
            session.viewTimes++;

        var params = {
            viewInfo: session.viewTimes || 'Страница не была посещена раннее'
        };

        res.send(jade.renderFile('views/draw.jade', params));
    });

    var rootFoldier = __dirname.split('/').slice(0, -1).join('/');

    app.use('/public', express.static(rootFoldier + '/public'));

};