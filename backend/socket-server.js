/**
 * @param {Function} sessionHandler – middleware для сессий, тот же самый, что и для главного сервера
 */

'use strict';

module.exports = (sessionHandler) => {
    let WebSocketServer = new require('ws');

    // WebSocket-сервер на порту 8081
    let webSocketServer = new WebSocketServer.Server({
        port: 8081
    });

    let connections = {};

    webSocketServer.on('connection', function(ws) {
        let req = ws.upgradeReq;
        let res = { writeHead: {} }; // Particularly nasty

        sessionHandler(req, res, function (err) {
            ws.on('message', function(message) {
                console.log('получено сообщение ' + message);

                let info = JSON.parse(message);

                // one from SocketAction
                switch (info.type) {
                    case 'CONNECT':
                        let boardID = info.data
                        req.session.currentBoard = boardID;
                        connections[boardID] || (connections[boardID] = []);
                        connections[boardID].push(ws);
                        break;

                    default:
                        connections[req.session.currentBoard].forEach(function(ws, i) {
                            ws.send(JSON.stringify(info));
                        });
                        break;
                }
            });

            // TODO: выпилить из connections
            ws.on('close', function() {
                console.log('соединение закрыто ' + req.sessionID);
            });
        });
    });
};

/**
 * @type {('CONNECT_DRAW'|'CONNECT_WATCH'|'CONNECT'|'DRAW_START'|'DRAW_PROGRESS'|'DRAW_END')} SocketAction - one from list of available socket actions
 */