const ERROR = {
    INPUT: {
        USERNAME: {
            ALREADYEXIST: "User Already Exists",
            INVALID: "Invalid Username"
        },
        EMAIL: {
            INVALID: "Invalid Email",
            ALREADYEXIST: "Email already registerd"
        },
        PASSWORD: {
            INVALID: "Invalid Password",
            NOTMATCH: "Passwords dont match"
        }
    }
}

const APPSTATE = {
    LOAD: "loading",
    ONMENU: "onMenu",
    GAMESTARTED: "gameStarted",
}

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
     GRID_HEIGHT: 20,
     GRID_WIDTH: 20,

    TILE: {
         TYPE: {
             PLAYER: "player",
             OBSTACLE: "obstacle",
             FLOOR: "floor"
         }
    }
}

const GAMESERVER = {
    URL: "localhost",
    PORT: "3050",
    PATH: "",
}

const REGEX = {
    ALLOWDCHARACTERS: /[A-Za-z0-9]+\._[A-Za-z0-9]+@/,
    EMAILCHARACTERS: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/
}


export {KEYCODES, DIRECTIONS, MAP, GAMESERVER, APPSTATE, REGEX};