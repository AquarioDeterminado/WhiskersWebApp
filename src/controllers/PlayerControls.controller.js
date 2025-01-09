import {useEffect} from "react";
import {DIRECTIONS, KEYCODES, MAP} from "../utils/Constants";
import debounce from 'lodash.debounce';
import {endGame} from "./GameManager.controller";

let mapObjects, setMapObjects = undefined;

function PlayerControlsController({_mapObjects, _setMapObjects}) {
    mapObjects = _mapObjects;
    setMapObjects = _setMapObjects;
    useEffect(() => {
        window.addEventListener("keydown", (event) => debounce(handleKeyDown, 100, {leading: false, trailing: true, maxWait: 200})(event));
        return () => {
            window.removeEventListener("keydown", (event) => handleKeyDown(event));
        };
    });
}

function handleKeyDown(event) {
    switch (event.keyCode) {
        case KEYCODES.ARROWLEFT:
        case KEYCODES.A:
            movePlayer(DIRECTIONS.LEFT)
            break;
        case KEYCODES.ARROWUP:
        case KEYCODES.W:
            movePlayer(DIRECTIONS.UP)
            break;
        case KEYCODES.ARROWRIGHT:
        case KEYCODES.D:
            movePlayer(DIRECTIONS.RIGHT)
            break;
        case KEYCODES.ARROWDOWN:
        case KEYCODES.S:
            movePlayer(DIRECTIONS.DOWN)
            break;
        default:
            break;
    }
}

function movePlayer(direction) {
    let player = getPlayer();
    if (player === undefined) return;

    let oldPosition = player.position

    let newPosition = {...oldPosition};
    switch (direction) {
        case DIRECTIONS.UP:
            newPosition.y++;
            break;
        case DIRECTIONS.DOWN:
            newPosition.y--;
            break;
        case DIRECTIONS.LEFT:
            newPosition.x--;
            break;
        case DIRECTIONS.RIGHT:
            newPosition.x++;
            break;
        default:
            break;
    }

    if (isPositionValid(newPosition)) {
        changePosition(oldPosition, newPosition);
    }
}

function ranIntoObstacle(newPosition) {
    for (let i = 0; i < mapObjects.length; i++) {
        if (mapObjects[i].position.x === newPosition.x && mapObjects[i].position.y === newPosition.y && mapObjects[i].type === "obstacle") {
            endGame();
            return true;
        }
    }
    return false;
}

function changePosition(oldPosition, newPosition) {
    let player = getPlayer();

    player = mapObjects.splice(mapObjects.indexOf(player), 1)[0];

    if (!ranIntoObstacle(newPosition)) {
        player.position = newPosition;
    } else {
        endGame();
        return;
    }

    setMapObjects([...mapObjects,  player]);
}

function isPositionValid(newPosition) {
    return newPosition.x >= 0 && newPosition.x < MAP.GRID_WIDTH && newPosition.y >= 0 && newPosition.y < MAP.GRID_HEIGHT;
}

function getPlayer() {
    let player = mapObjects.find((element) => {
        return element.type === "player";
    });
    return player;
}

export default PlayerControlsController;