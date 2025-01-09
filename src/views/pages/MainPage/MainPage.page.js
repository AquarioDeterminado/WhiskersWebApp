import {GameMap} from "../../components/GameMap/GameMap.component";
import PlayerControlsController from "../../../controllers/PlayerControls.controller";
import {useEffect, useState} from "react";
import {GameManager, initMapObjects} from "../../../controllers/GameManager.controller";
import {APPSTATE, GAMESERVER} from "../../../utils/Constants";
import {io} from "socket.io-client";
import styles from "./MainPage.module.css";
import {getAuthInfo} from "../../../utils/Utils";

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
            let authInfo = getAuthInfo()
            socket.emit('NewPlayer', {text: `{"Username": "${authInfo.username}", "token":"${authInfo.token}"}`})
            setAppState(APPSTATE.ONMENU);
        }

    }, [appState])

    useEffect(() => {
        initMapObjects();
    }, []);

    function startGame() {
        let authInfo = getAuthInfo()
        socket.emit('CreateLobby', {text: `{"Username": "${authInfo.username}", "token":"${authInfo.token}", "Type": "Multiplayer"}`})
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