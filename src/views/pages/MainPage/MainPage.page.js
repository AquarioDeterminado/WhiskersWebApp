import {GameMap} from "../../components/GameMap/GameMap.component";
import PlayerControlsController from "../../../controllers/PlayerControls.controller";
import {useEffect, useState} from "react";
import {GameManager, initMapObjects} from "../../../controllers/GameManager.controller";
import {APPSTATE, GAMESERVER} from "../../../utils/Constants";
import {io} from "socket.io-client";
import styles from "./MainPage.module.css";

let socket;

function MainPage() {

    const [appState, setAppState] = useState(APPSTATE.LOAD)
    const [mapObjects, setMapObjects] = useState();


    useEffect( () => {
        socket = io.connect(`http://${GAMESERVER.URL}:${GAMESERVER.PORT}`);

        socket.on('news', function (data) {
            console.log('Received news from server:', data);
        });

        socket.on('status', function (data) {
            console.log('Received news from server:', data);
        });

        if (appState === APPSTATE.LOAD) {
            socket.emit('NewPlayer', {text: {Username: "pessoa"}});
            setAppState(APPSTATE.ONMENU);
        }

    }, [appState])

    useEffect(() => {
        initMapObjects();
    }, []);

    function startGame() {
        socket.emit('CreateLobby', {Username: "pessoa", Type: "Singleplayer"})
        console.log(socket)
        setAppState(APPSTATE.GAMESTARTED)
    }

    return (
        <div className={styles.MainPage}>
            <h1>Main Page</h1>
            <p>This is the main page</p>
            <p>Map</p>
            <button onClick={startGame}>Start Game</button>
            <div className={styles.GameMap}>

                <GameManager _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                <PlayerControlsController _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                <GameMap mapObjects={mapObjects}/>

            </div>
        </div>
    );
}

export default MainPage;