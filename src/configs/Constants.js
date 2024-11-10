const KEYCODES = {
    ARROWLEFT: 37,
    ARROWRIGHT: 39,
    ARROWUP: 38,
    ARROWDOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68
}

const DIRECTIONS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right"
}

const MAP = {
     GRID_HEIGHT: 10,
     GRID_WIDTH: 10,

    TILE: {
         TYPE: {
             PLAYER: "player",
             OBSTACLE: "obstacle",
             FLOOR: "floor"
         }
    }
}


export {KEYCODES, DIRECTIONS, MAP};