import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import ScoreDisplay from "./ScoreDisplay";
import styles from './UI.module.css';

const CurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);

    return (
        <div className={styles.rightContainer}>
            <ScoreDisplay/>
            <h2 className={styles.currentLevelText}>Current {currentGameLevel.level} - {currentGameLevel.round}</h2>
        </div>
    );
}

export default CurrentLevelDisplay;