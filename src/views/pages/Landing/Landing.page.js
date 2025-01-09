import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../configs/Routes";
import styles from './Landing.module.css'
import Assets from "../../../configs/AssetHandler";


function StartButton() {
    const navigate = useNavigate();

    function startGame() {
        navigate(ROUTES.LOGIN)
    }

    return (
        <>
            <div className={styles.startButton} onClick={startGame} >
                Start
            </div>
        </>
    );
}

function LandingPage() {

    let navigate = useNavigate()

    function goToMainPage(event) {
        navigate(ROUTES.LOGIN)
    }

    return (
        <>
            <img src={Assets.backgrounds.LandingPage} className={styles.backgroundImg}/>
            <div className={styles.LandingPage}>
                <div className={styles.Title}>Red Whiskers</div>
                <StartButton onClick={goToMainPage}>Start Game</StartButton>
            </div>
        </>
    )
}

export default LandingPage