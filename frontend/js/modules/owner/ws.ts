/// <reference path="../globals.d.ts"/>

import * as Base from 'common/ws';
import * as DrawController from 'draw/controller';

import Utils = require('core/utils');

let WS = Base.WebsocketTransport;

declare var Utils:any;

interface drawData {
    shape: string // shape – элемент множества {Shapes}
    coords: Coords
}

interface keyboardData {
    // может быть либо backspace: true, либо text
    backspace?: boolean
    text?: string
}

interface ActionInterface {
    type: string
    data: drawData|keyboardData|any // "any" only for ide
}

class WebsocketTransportOwner extends WS {
    private SOCKET_INITED: boolean = false;

    private _onSocketOpenQueue: Array<Function> = [];

    constructor() {
        super();

        this.socket.onopen = () => {
            this.SOCKET_INITED = true;
            this.socketSend(WS.types.CONNECT);

            while(this._onSocketOpenQueue.length)
                // TODO: Проверить!
                this._onSocketOpenQueue.shift()();
        };
    }

    /**
     *
     * @param {String} typeID - Тип из WebsocketTransport.types
     * @param {String} shape - Фигура из множества {Shapes}
     * @param {Coords|String} coords – координаты, если рисуем, id доски, если подключились,
     *                                 any добавлено для транслятора
     */
    private socketSend(typeID: string, shape?: string, coords?: Coords|string|any) {
        let data;

        let send = () => {
            switch (typeID) {
                case WS.types.DRAW_START:
                    data = { shape };
                case WS.types.DRAW_PROGRESS:
                    data || (data = {});
                    data.coords = [coords.left, coords.top];
                    break;

                case WS.types.DRAW_END:
                    break;

                case WS.types.CONNECT:
                case WS.types.CONNECT_WATCH:
                case WS.types.CONNECT_DRAW:

                    data = Utils.getCurrentBoardId();
                    break;
            }

            // message for sockets and draw controller;
            let msg = {
                type: typeID,
                data
            };

            this.socket.send(JSON.stringify(msg));

            // Обновляем состояние на canvas
            DrawController.trigger(msg);
        };

        // TODO: ПРОВЕРИТЬ!
        this.SOCKET_INITED ?
            send() :
            this._onSocketOpenQueue.push(send);

    }

    // Чтобы не отправлять лишние запросы на сервер
    private drawingInProgress:boolean = false;

    public send(params:ActionInterface) {
        params.data || (params.data = {});

        switch (params.type) {
            case WS.types.DRAW_START:
                this.drawingInProgress = true;
                break;
            case WS.types.DRAW_PROGRESS:
                if (!this.drawingInProgress) return;
                break;
            case WS.types.DRAW_END:
                this.drawingInProgress = false;
                break;
        }

        this.socketSend(params.type, params.data.shape, params.data.coords);
    }
}

export = new WebsocketTransportOwner();
