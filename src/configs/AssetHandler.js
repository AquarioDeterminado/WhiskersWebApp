//Pandas
import defaultPanda from '../assets/sprites/pandas/pandaDefault.png';

//Floor
import floorDefault from '../assets/sprites/tiles/floor.default.png';

//Obstacles
import obstacleDefault from '../assets/sprites/tiles/obstacle.default.png';


const Assets = {
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
        panda: (panda) => {
            if (panda !== undefined)
                return (<img alt="" src={panda} style={{zIndex: 1}}></img>);
            else
                return (<img alt="" src={defaultPanda} style={{zIndex: 1}}></img>);
        }
    }

}

export default Assets;