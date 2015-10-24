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

enum Shapes {
    Rect,
    Ellipse,
    Line,
    Triangle,
    Cursor,
    Text,
    Arrow,
    Move
}

type EventHandler = (event: string, handler: any) => any

interface Observer {
    on: EventHandler
    trigger: EventHandler
    off: EventHandler
    un: EventHandler
}

