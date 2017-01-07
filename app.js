'use strict';

var express = require('express'),
    app = express(),
    session = require('express-session'),

    sessionHandler = session({
        secret: 'qwerty - the best secret key ever!',
        resave: false,
        saveUninitialized: true,
        // TODO: разобраться, в дев режиме без него не работает
        cookie: { secure: false }
    });

app.use(sessionHandler);

// Инициализируем роутер
require('./backend/router')(app);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    // eslint-disable-next-line no-console
    console.log('Example app listening at http://%s:%s', host, port);
});

// Инициализируем сервер для сокетов
require('./backend/socket-server')(sessionHandler);
