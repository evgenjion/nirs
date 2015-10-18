var express = require('express'),
    jade = require('jade'),

    app = express(),
    session = require('express-session'),

    sessionHandler = session({
        secret: 'qwerty - the best secret key ever!',
        resave: false,
        saveUninitialized: true,
        // TODO: разобраться, в дев режиме без него не работает
        cookie: { secure: false }
    }),

    router;

app.use(sessionHandler);

router = require('./backend/router')(app);

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

socketServer = require('./backend/socket-server')(sessionHandler);