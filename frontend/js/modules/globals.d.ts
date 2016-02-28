///////////
// Globals:
///////////
declare var define: (moduleId: string, deps: string[], any:Function) => any;
declare var require: ((deps: Array<string>, callback: Function) => any)|any;
declare var requirejs = require;
declare var fabric;
declare var $: any;

////////////////
// Custom types:
////////////////
interface Coords {
    left: number
    top: number
}

declare enum FabricShapes {
    Rect,
    Ellipse,
    Line,
    Triangle,
    Cursor,
    Text,
    Arrow,
    Move
}

declare type EventHandler = (event: string, handler: any) => any

interface Observer {
    on: EventHandler
    trigger: EventHandler
    off: EventHandler
    un: EventHandler
}

declare class WebsocketTransport {}