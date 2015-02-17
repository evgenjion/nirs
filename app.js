var express = require('express'),
    jade = require('jade'),
    app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
     res.send(jade.renderFile('views/index.jade', {
        // can be used in index.jade
        param: 'param qwerty ololo'
     }));
});

var path = require('path');

app.use(express.static(__dirname, '/public'));

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
