import GameMap from "../components/GameMap/GameMap.component";
import PlayerControls from "../../controllers/PlayerControls";

function MainPage() {

    let mapObjects = [
        {type: "player", position: {x: 5, y: 2}},
        {type: "obstacle", position: {x: 3, y: 8}},
        {type: "floor", position: {x: 1, y: 4}},
        {type: "obstacle", position: {x: 2, y: 5}},
    ];

    return (
        <div>
            <h1>Main Page</h1>
            <p>This is the main page</p>
            <p>Map</p>
            <div style={{alignItems: "center", alignSelf: "center", alignContent: "center", verticalAlign: "middle"}}>

                <PlayerControls/>

                <GameMap mapObjects={mapObjects}/>

            </div>
        </div>
    );
}

export default MainPage;