import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import ScoreDisplay from "./ScoreDisplay";
import styles from './UI.module.css';

const RelectionCurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);

    return (
        <div className={styles.reflectionRightContainer}>
            <ScoreDisplay/>
            <h2 className={styles.currentLevelText}>Current {currentGameLevel.level} - {currentGameLevel.round}</h2>
        </div>
    );
}

export default RelectionCurrentLevelDisplay;