/**
 * @module customer/ws транспортный модуль для принимания информации с сервера
 */
/// <reference path="../globals.d.ts"/>

// import * as mod1 from "mod1";
// import mod2 = require("mod2");
// import {z} from "mod3";

import * as Base from 'common/ws'
import * as DrawController from 'draw/controller'

import Utils = require('core/utils');

// Temp:( for IDE
declare var Utils:any;
declare var DrawController:any;

let WS = Base.WebsocketTransport;

class WebSocketClient extends WS {
    private observer:Observer;

    constructor() {
        super();

        this.socket.onopen = () => {
            let boardId = Utils.getCurrentBoardId();

            console.log('socket init!');

            this.socket.send(JSON.stringify({
                type: WS.types.CONNECT,
                data: boardId
            }));
        };

        this.socket.onmessage = (e) => {
            let msg = JSON.parse(e.data);

            DrawController.trigger(msg);
        };

        this.observer = new Utils.EventSupport();
    }

    public onDrawUpdate(callb:Function):void {
        this.observer.on('draw-update', callb);
    }
}

export = new WebSocketClient();