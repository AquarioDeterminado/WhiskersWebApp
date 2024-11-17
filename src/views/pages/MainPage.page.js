import {GameMap} from "../components/GameMap/GameMap.component";
import PlayerControlsController from "../../controllers/PlayerControls.controller";
import {useEffect, useState} from "react";
import {GameManager, initMapObjects} from "../../controllers/GameManager.controller";

function MainPage() {

    const [mapObjects, setMapObjects] = useState();

    useEffect(() => {
        initMapObjects();
    }, []);

    return (
        <div>
            <h1>Main Page</h1>
            <p>This is the main page</p>
            <p>Map</p>
            <div style={{alignItems: "center", alignSelf: "center", alignContent: "center", verticalAlign: "middle"}}>

                <GameManager _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                <PlayerControlsController _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                <GameMap mapObjects={mapObjects}/>

            </div>
        </div>
    );
}

export default MainPage;