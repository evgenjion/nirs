/**
 * @file модуль, в котором будет содержаться логика принятия событий
 * и вызова методов из draw/core
 */
declare var define:(moduleId: string, deps: string[], any) => any;
declare var fabric;

type EventHandler = (event: string, handler: any) => any

interface Observer {
    on: EventHandler
    trigger: EventHandler
    off: EventHandler
    un: EventHandler
}

// координаты действия мыши
interface Coords {
    left: number
    top: number
}


class DrawController {
    private DEFAULT_DRAW_TYPE: string = 'Rect';
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

    /**
     * @param NIRS - global namespace
     * @param core - модуль draw/core
     *
     * TODO: отрефакторить
     */
    constructor(NIRS: Observer, core: any) { // TODO: поправить тип any
        this.NIRS = NIRS;
        this.drawCore = core;
    }

    /**
     * возвращает инстанс fabric.Canvas, должен быть синглтон
     */
    public getCanvas() {
        return this.canvas;
    }

    /**
     * Назначает новый тип объекта для отрисовки
     *
     * @param {string} shapeType – модификатор класса из html
     */
    public setDrawType(shapeType: string) {
        this.currentDrawType = this.fabricTypes[shapeType] || this.DEFAULT_DRAW_TYPE;

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
    private notNeedDrawing() {
        return ~['Move', 'Cursor'].indexOf(this.currentDrawType);
    }
}

define('draw/controller', ['core/core', 'draw/core'], (NIRS, core)=> {
    var controller = new DrawController(NIRS, core);

    return controller;
});
