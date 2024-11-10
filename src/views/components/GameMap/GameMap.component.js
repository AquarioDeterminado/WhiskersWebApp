import styles from "./GameMap.component.module.css";
import Assets from "../../../configs/AssetHandler";
import {MAP} from "../../../configs/Constants";

function getTileContent(info) {
    if(info !== undefined)
        switch (info.type) {
            case MAP.TILE.TYPE.FLOOR:
                return (Assets.mapObjects.tiles.floor.test);

            case MAP.TILE.TYPE.OBSTACLE:
                return (Assets.mapObjects.tiles.obstacles.test);

            case MAP.TILE.TYPE.PLAYER:
                return (Assets.mapObjects.panda(info.panda));

            default:
                return (Assets.mapObjects.tiles.floor.test);
        }
    else {
        return (Assets.mapObjects.tiles.floor.test);
    }
}

function MapTile({index, object}) {
    let tileContent = getTileContent(object);

    return (
        <div className={styles.mapTile}>
            {tileContent}
        </div>
    );
}

function MapRow({tiles}) {
    return (
        <div className={styles.mapRow}>
            {tiles.map((tile) => tile)}
        </div>
    );
}

function GameMap({mapObjects}) {
    let grid = makeMap(mapObjects);

    return (
    <div className={styles.gameMap}>
        {grid !== undefined ? grid.reverse().map((row) => row) : "Loading..."}
    </div>
  );
}

function makeMap(mapObjects) {
    let grid = makeGrid()

    if(mapObjects !== undefined) {
        for (let i = 0; i < mapObjects.length; i++) {
            //make tile
            let object = mapObjects[i];
            let x = object.position.x;
            let y = object.position.y;
            let newTile = <MapTile object={object} index={{x, y}} key={x + ":" + y}/>;

            //insert tile in row component
            let row = grid[y];
            row.props.tiles[x] = newTile;
        }
    }

    return grid;
}

//mapObjects: [{x: int, y: int, id: int}]
function makeGrid() {
    let grid = [];

    for (let currentRow = 0; currentRow < GRID_HEIGHT; currentRow++) {
        let mapRow = [];

        for (let currentColumn = 0; currentColumn < GRID_WIDTH; currentColumn++) {
            mapRow.push(<MapTile index={{x: currentColumn, y: currentRow}} key={currentColumn + ":" + currentRow}/>)
        }
        grid.push(<MapRow tiles={mapRow} key={currentRow}/>);
    }
    return grid;
}

export default GameMap;

