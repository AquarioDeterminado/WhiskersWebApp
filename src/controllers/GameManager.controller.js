let mapObjects, setMapObjects;

function GameManager({_mapObjects, _setMapObjects}) {
    mapObjects = _mapObjects;
    setMapObjects = _setMapObjects;
}

function initMapObjects(){
    setMapObjects([
        {position:{x: 4, y: 2}, id: 0, type: "player"},
        {position:{x: 3, y: 5}, id: 1, type: "obstacle"},
        {position:{x: 4, y: 5}, id: 2, type: "obstacle"},
        {position:{x: 6, y: 6}, id: 3, type: "obstacle"},
        {position:{x: 2, y: 7}, id: 4, type: "obstacle"}
    ]);
}

function endGame() {
    initMapObjects();
}

export {GameManager, initMapObjects, endGame};