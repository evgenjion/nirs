///////////
// Globals:
///////////
declare var define:(moduleId: string, deps: string[], any) => any;
declare var fabric;

////////////////
// Custom types:
////////////////
interface Coords {
    left: number
    top: number
}

declare enum Shapes {
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