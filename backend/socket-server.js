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

        sessionHandler(req, res, function(err) { // eslint-disable-line no-unused-vars
            ws.on('message', function(message) {
                console.log('получено сообщение ' + message); // eslint-disable-line no-console

                const info = JSON.parse(message),
                    boardID = info.data;

                // one from SocketAction
                switch (info.type) {
                case 'CONNECT':
                    req.session.currentBoard = boardID;

                    connections[boardID] || (connections[boardID] = []);
                    connections[boardID].push(ws);

                    ws.boardID = boardID;
                    break;

                default:
                    connections[req.session.currentBoard].forEach(function(ws) {
                        ws && ws.send(JSON.stringify(info));
                    });
                    break;
                }
            });

            ws.on('close', function() {
                const { boardID } = ws,
                    boardRoom = connections[boardID];

                if (!boardRoom) return;

                boardRoom.splice(boardRoom.indexOf(ws), 1);

                // eslint-disable-next-line no-console
                console.log('соединение закрыто ' + req.sessionID);
            });
        });
    });
};

/**
 * @type {('CONNECT_DRAW'|'CONNECT_WATCH'|'CONNECT'|'DRAW_START'|'DRAW_PROGRESS'|'DRAW_END')} SocketAction - one from list of available socket actions
 */
