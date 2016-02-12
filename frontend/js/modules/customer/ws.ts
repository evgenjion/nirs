/**
 * @module customer/ws транспортный модуль для принимания информации с сервера
 */
/// <reference path="../globals.d.ts"/>

import Base = require('common/ws');
import Utils = require('core/utils');
import DrawController = require('draw/controller');

declare var Utils:any;

class WebSocketClient extends Base.WebsocketTransport {
    private observer:Observer;

    constructor() {
        super();

        this.socket.onopen = () => {
            let boardId = Utils.getCurrentBoardId();

            console.log('socket init!');

            this.socket.send(JSON.stringify({
                type: this.types.CONNECT,
                data: boardId
            }));
        };

        this.socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);
            let data = msg.data;

            console.log(data);

            //TODO: выпилить отсюда эту логику, оставить только транспортную
            switch (msg.type) {
                case this.types.DRAW_START:
                    DrawController.setDrawType(data.shape);
                    DrawController.drawingStart(formatCoords(data.coords));
                    break;
                case this.types.DRAW_PROGRESS:
                    console.log(formatCoords(data.coords));
                    DrawController.drawingUpdate(formatCoords(data.coords));
                    break;
                case this.types.DRAW_END:
                    DrawController.drawingEnd();
                    break;
                default:
                    console.error('unsupported data: ', data);

            }

            // DrawController.trigger(msg.type, data);

            function formatCoords(coords: Array<number>) {
                let [left, top] = coords;
                return { left, top };
            }
        };

        this.observer = new Utils.EventSupport();
    }

    public onDrawUpdate(callb:Function):void {
        this.observer.on('draw-update', callb);
    }
}

export = new WebSocketClient();