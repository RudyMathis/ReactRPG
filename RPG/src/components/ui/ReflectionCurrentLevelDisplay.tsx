import { useAtom, useAtomValue } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import ScoreDisplay from "./ScoreDisplay";
import styles from './UI.module.css';
import { tutorialAtom } from "../../atom/TutorialAtom";

const RelectionCurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const tutorial = useAtomValue(tutorialAtom);

    return (
        <div className={styles.reflectionRightContainer} {...(tutorial.isTutorial &&  { 'data-tutorial-show': tutorial.isTutorialVisible })}>
            <ScoreDisplay/>
            <h2 className={styles.currentLevelText}>Current {currentGameLevel.level} - {currentGameLevel.round}</h2>
        </div>
    );
}

export default RelectionCurrentLevelDisplay;