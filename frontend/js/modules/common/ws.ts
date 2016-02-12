/// <reference path="../globals.d.ts"/>

export class WebsocketTransport {
    public static types = {
        CONNECT_DRAW: 'CONNECT_DRAW',
        CONNECT_WATCH: 'CONNECT_WATCH',
        CONNECT: 'CONNECT', // Простое соединение к доске, правами можно порулить на сервере

        DRAW_START: 'DRAW_START',
        DRAW_PROGRESS: 'DRAW_PROGRESS', // чтобы real-time наблюдать
        DRAW_END: 'DRAW_END'
    };

    // FIXME: нормальный адрес
    protected socket = new WebSocket("ws://localhost:8081/draw");
}