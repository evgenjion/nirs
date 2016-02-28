/// <reference path="../globals.d.ts"/>

export class WebsocketTransport {
    public static types = {
        CONNECT: 'CONNECT', // Простое соединение к доске, правами можно порулить на сервере

        DRAW_START: 'DRAW_START',
        DRAW_PROGRESS: 'DRAW_PROGRESS', // чтобы real-time наблюдать
        DRAW_END: 'DRAW_END',

        EVENT: 'EVENT' // Другие события, например клавиатура
    };

    // FIXME: нормальный адрес
    protected socket = new WebSocket("ws://localhost:8081/draw");
}