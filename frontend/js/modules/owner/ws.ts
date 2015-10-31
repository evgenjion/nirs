/// <reference path="../globals.d.ts"/>

import Base = require('common/ws');
import Utils = require('core/utils');

declare var Utils:any;

class WebsocketTransportOwner extends Base.WebsocketTransport {
    private SOCKET_INITED: boolean = false;

    private _onSocketOpenQueue: Array<Function> = [];

    constructor() {
        super();

        this.socket.onopen = () => {
            this.SOCKET_INITED = true;
            this.socketSend(this.types.CONNECT);

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
                case this.types.DRAW_START:
                    data = { shape };
                case this.types.DRAW_PROGRESS:
                    data || (data = {});
                    data.coords = [coords.left, coords.top];
                    break;

                case this.types.DRAW_END:
                    break;

                case this.types.CONNECT:
                case this.types.CONNECT_WATCH:
                case this.types.CONNECT_DRAW:

                    data = Utils.getCurrentBoardId();
                    break;
            }

            this.socket.send(JSON.stringify({
                type: typeID,
                data
            }));
        };

        // TODO: ПРОВЕРИТЬ!
        this.SOCKET_INITED ?
            send() :
            this._onSocketOpenQueue.push(send);

    }

    // Чтобы не отправлять лишние запросы на сервер
    private drawingInProgress:boolean = false;

    /**
     *
     * @param {String} shape – элемент множества {Shapes}
     * @param {Coords} coords - координаты мыши
     */
    public drawStart(shape: string, coords: Coords) {
        this.drawingInProgress = true;

        this.socketSend(this.types.DRAW_START, shape, coords);
    }

    public drawProgress(shape: string, coords: Coords) {
        if (!this.drawingInProgress) return;

        this.socketSend(this.types.DRAW_PROGRESS, shape, coords);
    }

    public endProgress() {
        this.drawingInProgress = false;
        this.socketSend(this.types.DRAW_END);
    }
}

export = new WebsocketTransportOwner();

