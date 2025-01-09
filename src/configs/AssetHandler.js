//Pandas
import defaultPanda from '../assets/sprites/pandas/pandaDefault.png';

//Floor
import floorDefault from '../assets/sprites/tiles/floor/floor.grass.png';

//Obstacles
import obstacleDefault from '../assets/sprites/tiles/obstacles/obstacle.water.png';

import Logo from '../assets/logo/logo.png';

import LandingPageBackground from '../assets/backgrounds/landingPageBackground.png';
import GameBackground from '../assets/backgrounds/gameBackground.png';
import LoIngBackground from '../assets/backgrounds/loginBackground.png';
import SignUpBackground from '../assets/backgrounds/signupBackground.png';


const Assets = {
    backgrounds: {
        LandingPage: LandingPageBackground,
        Game: GameBackground,
        LoIng: LoIngBackground,
        SignUp:SignUpBackground
    },
    logos: {
        default: Logo
    },
    sprites: {
        tiles: {
            floor: {
                test: floorDefault
            },
            obstacles: {
                test: obstacleDefault
            }
        },
        pandas: {
            defaultPanda: defaultPanda
        }
    },
    mapObjects: {
        tiles: {
            floor: {
                test: (<img alt="" src={floorDefault} style={{zIndex: -1}}></img>)
            },
            obstacles: {
                test: (<img alt="" src={obstacleDefault} style={{zIndex: 0}}></img>)
            }
        },
        panda: (panda, isPlayer) => {
            if (panda !== undefined)
                return (<img alt="" src={panda} style={{zIndex: 1}} id={isPlayer? "player" : "opponent"} ></img>);
            else
                return (<img alt="" src={defaultPanda} style={{zIndex: 1}} id={isPlayer? "player" : "opponent"}></img>);
        }
    }

}

export default Assets;