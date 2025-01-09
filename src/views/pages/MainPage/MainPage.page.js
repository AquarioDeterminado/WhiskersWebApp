import {GameMap} from "../../components/GameMap/GameMap.component";
import PlayerControlsController from "../../../controllers/PlayerControls.controller";
import {useEffect, useState} from "react";
import {GameManager, initMapObjects} from "../../../controllers/GameManager.controller";
import {APPSTATE, GAMESERVER} from "../../../utils/Constants";
import {io} from "socket.io-client";
import styles from "./MainPage.module.css";
import {getAuthInfo} from "../../../utils/Utils";
import Assets from "../../../configs/AssetHandler";


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
            let interval = undefined;

            if (data.content === 'O jogo vai começar! Estás preparado!') {
                let a = 0;
                //while (true)
                interval = setInterval(() => {

                    let random = Math.floor(Math.random() * 8000) / 1000;
                    if (random > 0.01 && random < 0.99)
                        random = "up";
                    else if (random > 0.98 && random < 1.99)
                        random = "down";
                    else if (random > 1.98 && random < 2.99)
                        random = "left";
                    else if (random > 2.98 && random < 3.99)
                        random = "right";
                    else if (random > 3.98 && random < 4.99)
                        random = "left";
                    else if (random > 4.98 && random < 5.99)
                        random = "right";
                    else if (random > 5.98 && random < 6.99)
                        random = "left";
                    else
                        random = "wait";

                    // socket.emit('Ping', { text: { Username: socket.username, token: token, x: 0, y: 0, move: random } });
                    // await new Promise(resolve => setTimeout(resolve, 1000));//TODO: 500ms
                    let authInfo = getAuthInfo()
                    socket.emit('Ping', { text: { Username:authInfo.username, token:authInfo.token, x: 0, y: 0, move: "up" }});
                    console.log("Ping " + a);
                }, 1000 / 4);
            }
            else if (data.content === "Kick" || data.content === "Ban")
                process.exit();
            else if (data.content ==="GAME OVER, Você morreu!") {
                console.log("Game Over");
                if (interval !== undefined)
                    clearInterval(interval);
            }
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
        socket.emit('CreateLobby', {text: `{"Username": "${authInfo.username}", "token":"${authInfo.token}", "typeLobby": "Multiplayer"}`})
        setAppState(APPSTATE.GAMESTARTED)
    }

    function startSinglePlayerGame() {
        let authInfo = getAuthInfo()
        socket.emit('CreateLobby', {text: `{"Username": "${authInfo.username}", "token":"${authInfo.token}", "typeLobby": "Singleplayer"}`})
        setAppState(APPSTATE.GAMESTARTED)
    }

    function addBot() {
        socket.emit('NewBot', {text: `{"botname": "bot", "type": 2, "idLobby": 1}`})
    }

    return (
        <>
            <img src={Assets.backgrounds.HomePage} className={styles.backgroundImg}/>
            <div className={styles.MainPage}>
                <div className={styles.Title}>Red Whiskers</div>
                <div className={styles.buttonLine}>
                    <button onClick={startSinglePlayerGame} className={styles.button} >SinglePlayer Game</button>
                    <button onClick={startGame} className={styles.button}>Start Lobby</button>
                    <button onClick={addBot} className={styles.button}>Add Bot</button>
                </div>
                <div className={styles.GameMap}>

                    <GameManager _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                    <PlayerControlsController _mapObjects={mapObjects} _setMapObjects={setMapObjects}/>

                    <GameMap mapObjects={mapObjects}/>

                </div>
            </div>
        </>
    );
}

export default MainPage;