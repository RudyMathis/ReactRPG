import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import ScoreDisplay from "./ScoreDisplay";
import styles from './UI.module.css';

const CurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);

    return (
        <div className={styles.rightContainer}>
            <ScoreDisplay/>
            <div className={styles.currentLevelContainer}>
                <h2>Stage</h2>
                <h2>{String(currentGameLevel.level).padStart(2, '0')}-{String(currentGameLevel.round).padStart(2, '0')}</h2>
            </div>
        </div>
    );
}

export default CurrentLevelDisplay;