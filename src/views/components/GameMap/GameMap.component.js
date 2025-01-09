import styles from "./GameMap.component.module.css";
import Assets from "../../../configs/AssetHandler";
import {MAP} from "../../../utils/Constants";

function getTileContent(info) {
    if(info !== undefined)
        switch (info.type) {
            case MAP.TILE.TYPE.FLOOR:
                return (Assets.mapObjects.tiles.floor.test);

            case MAP.TILE.TYPE.OBSTACLE:
                return (Assets.mapObjects.tiles.obstacles.test);

            case MAP.TILE.TYPE.PLAYER:
                return (Assets.mapObjects.panda(info.panda, info.isPlayer));

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

    let map = makeMap(mapObjects);

    return (
    <div className={styles.gameMap}>
        {map !== undefined ? map.map((row) => row) : "Loading..."}
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
            let y = MAP.GRID_HEIGHT - object.position.y - 1;
            let newTile = <MapTile object={object} objectType={object.type} index={{x, y}} key={x + ":" + y}/>;

            //insert tile in row component
            grid[y].props.tiles[x] = newTile;
        }
    }

    return grid;
}

//mapObjects: [{x: int, y: int, id: int}]
function makeGrid() {
    let grid = [];

    for (let currentRow = 0; currentRow < MAP.GRID_HEIGHT; currentRow++) {
        let mapRow = [];

        for (let currentColumn = 0; currentColumn < MAP.GRID_WIDTH; currentColumn++) {
            mapRow.push(<MapTile index={{x: currentColumn, y: currentRow}} key={currentColumn + ":" + currentRow}/>)
        }
        grid.unshift(<MapRow tiles={mapRow} key={MAP.GRID_HEIGHT - currentRow}/>);
    }
    return grid;
}

export {GameMap, makeMap};

