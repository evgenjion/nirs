/**
 * @module customer/ws транспортный модуль для принимания информации с сервера
 */
/// <reference path="../globals.d.ts"/>

import Base = require('common/ws');
import Utils = require('core/utils');

class WebSocketClient extends Base.WebsocketTransport{
    constructor() {
        super();
        this.socket.onopen = function() {
            // TODO: WebsocketTransport реюзать код (Лучше вообще сунуть это  utils)
            let location = window.location.href.toString();
            let data = location.slice(location.lastIndexOf('/') + 1);

            this.socket.send(JSON.stringify({
                type: this.types.CONNECT,
                data
            }));
        };

        this.socket.onmessage = function () {
            console.log(arguments);
        };
    }
}

export = new WebSocketClient();