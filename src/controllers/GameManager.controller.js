let mapObjects, setMapObjects;

function GameManager({_mapObjects, _setMapObjects}) {
    mapObjects = _mapObjects;
    setMapObjects = _setMapObjects;
}

function initMapObjects(){
    setMapObjects([
        {position:{x: 0, y: 0}, id: 0, type: "player"},
        {position:{x: 1, y: 1}, id: 1, type: "obstacle"},
        {position:{x: 2, y: 2}, id: 2, type: "obstacle"},
        {position:{x: 3, y: 3}, id: 3, type: "obstacle"},
        {position:{x: 4, y: 4}, id: 4, type: "obstacle"}
    ]);
}

function endGame() {
    console.log(mapObjects);
}

export {GameManager, initMapObjects,endGame};