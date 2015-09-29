var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
    port: 8081
});

// TODO: сессии
webSocketServer.on('connection', function(ws) {

    //console.log(ws);

    var id = Math.random();
    clients[id] = ws;
    console.log("Подсоединили сокет: " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });
});