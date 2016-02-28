/**
 * @file модуль, в котором будет содержаться логика принятия событий
 * и вызова методов из draw/core
 */
/// <reference path="../globals.d.ts"/>

enum FabricShapes {
    Rect,
    Ellipse,
    Line,
    Triangle,
    Cursor,
    Text,
    Arrow,
    Move
}

import { WebsocketTransport } from 'common/ws';

// js modules import
import NIRS = require('core/core');
import drawCore = require('draw/core');


let  WS = WebsocketTransport;

// TODO: export
class DrawController {
    private DEFAULT_DRAW_TYPE: string = 'Cursor';
    private currentDrawType: string = this.DEFAULT_DRAW_TYPE;
    private canvas = new fabric.Canvas('canvas');

    private fabricTypes = {
        rectangle: 'Rect',
        ellipse: 'Ellipse',
        line: 'Line', // x1, x2, y1, y2
        triangle: 'Triangle',
        cursor: 'Cursor',
        text: 'Text',
        arrow: 'Arrow',
        move: 'Move'
    };

    private NIRS: Observer;
    private drawCore;

    static __instance:DrawController;

    private RENDER_DELAY:number = 15;

    /**
     * @param NIRS - global namespace
     * @param core - модуль draw/core
     *
     * TODO: отрефакторить
     */
    constructor(NIRS: Observer, core: any) { // TODO: поправить тип any
        if (DrawController.__instance) {
            return DrawController.__instance;
        }

        this.NIRS = NIRS;
        this.drawCore = core;

        this._initCanvas();

        DrawController.__instance = this;
    }

    /**
     * @typedef {Object} DrawStartData
     *
     * @property {String} shape – фигура из множества {Shapes}
     */

    /**
     * @typedef {Array<Number>} DrawProgressData
     *
     * @property 0 – left coord
     * @property 1 – top coord
     */

    /**
     * @typedef {Object} DrawMessage
     *
     * @property {string} type – one from common/ws types
     * @property {DrawStartData|DrawProgressData|string} data
     */

    /**
     *  @param {DrawMessage} e
     */
    public trigger(e:any) {
        let { type, data } = e;

        switch (type) {
            case WS.types.DRAW_START:
                this.setDrawType(data.shape);
                this.drawingStart(formatCoords(data.coords));
                break;
            case WS.types.DRAW_PROGRESS:
                this.drawingUpdate(formatCoords(data.coords));
                break;
            case WS.types.DRAW_END:
                this.drawingEnd();
                break;
            case WS.types.CONNECT:
                break;
            default:
                throw new Error('unsupported data: ' + JSON.stringify(data));
        }

        function formatCoords(coords: Array<number>) {
            let [left, top] = coords;
            return { left, top };
        }
    }

    /**
     *
     * @private Проинициализировать canvas, и его отрисовку
     */
    private _initCanvas() {
        // Изначально запрещаем выделять элементы на канвасе
        this.canvas.selection = false;

        setInterval(() => {
            this.canvas.renderAll();
        }, 15);
    }

    /**
     * возвращает инстанс fabric.Canvas, должен быть один инстанс для всего приложения
     */
    public getCanvas() {
        return this.canvas;
    }

    /**
     * Назначает новый тип объекта для отрисовки
     *
     * @param {string} shapeType – модификатор класса из html, либо какой-то элемент из FabricShapes(enum)
     */
    public setDrawType(shapeType: string) {

        if (shapeType in FabricShapes) {
            this.currentDrawType = shapeType;
        } else {
            this.currentDrawType = this.fabricTypes[shapeType] || this.DEFAULT_DRAW_TYPE;
        }

        if (this.currentDrawType === 'Move')
            this.canvas.selection = true;
        else
            this.canvas.selection = false;
    }

    public getDrawType(): string {
        return this.currentDrawType;
    }

    /**
     * метод, который вызывается при начале отрисовки фигуры(mousedown)
     */
    public drawingStart(coords: Coords) {
        if (this.notNeedDrawing()) return;

        this.drawCore.start(this.canvas, {
            type: this.currentDrawType,
            left: coords.left,
            top: coords.top
        });
    }

    public drawingUpdate(coords: Coords) {
        if (this.notNeedDrawing()) return;

        this.drawCore.update(coords);
    }

    /**
     * метод, который вызывается по окончанию отрисовки(mouseup)
     */
    public drawingEnd() {
        if (this.currentDrawType !== 'Text')
            this.drawCore.end();
    }

    /**
     * Для определенных типов рисовать не нужно
     *
     * @returns {number}
     */
    public notNeedDrawing() {
        return ~['Move', 'Cursor'].indexOf(this.currentDrawType);
    }

    public needDrawing(): boolean {
        return !this.notNeedDrawing();
    }
}

export = new DrawController(NIRS, drawCore);