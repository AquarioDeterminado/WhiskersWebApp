import {useEffect} from "react";
import {DIRECTIONS, KEYCODES} from "../configs/Constants";

function PlayerControls() {
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

}

function movePlayer(direction) {

}

function handleKeyDown(event) {
    switch (event.keyCode) {
        case KEYCODES.A || KEYCODES.ARROWLEFT:
            movePlayer(DIRECTIONS.LEFT)
            break;
        case KEYCODES.W || KEYCODES.ARROWUP:
            movePlayer(DIRECTIONS.UP)
            break;
        case KEYCODES.D || KEYCODES.ARROWRIGHT:
            movePlayer(DIRECTIONS.RIGHT)
            break;
        case KEYCODES.S || KEYCODES.ARROWDOWN:
            movePlayer(DIRECTIONS.DOWN)
            break;
        default:
            break;
    }
}

export default PlayerControls;