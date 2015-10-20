/**
 * @param {Function} sessionHandler – middleware для сессий, тот же самый, что и для главного сервера
 */
module.exports = (sessionHandler) => {
    var WebSocketServer = new require('ws');

    // WebSocket-сервер на порту 8081
    var webSocketServer = new WebSocketServer.Server({
        port: 8081
    });

    webSocketServer.on('connection', function(ws) {
        var req = ws.upgradeReq;
        var res = { writeHead: {} }; // Particularly nasty

        sessionHandler(req, res, function (err) {
            ws.on('message', function(message) {
                console.log('получено сообщение ' + message);
            });

            ws.on('close', function() {
                console.log('соединение закрыто ' + req.sessionID);
            });
        });
    });
};