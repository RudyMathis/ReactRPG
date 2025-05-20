import { useAtom, useAtomValue } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import styles from './UI.module.css';
import { tutorialAtom } from "../../atom/TutorialAtom";

const RelectionCurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const tutorial = useAtomValue(tutorialAtom);

    return (
        <div className={styles.reflectionRightContainer} {...(tutorial.isTutorial &&  { 'data-tutorial-show': tutorial.isTutorialVisible })}>
            <div className={styles.currentLevelContainer}>
                <h2>Stage</h2>
                <h2>{String(currentGameLevel.level).padStart(2, '0')}-{String(currentGameLevel.round).padStart(2, '0')}</h2>
            </div>
        </div>
    );
}

export default RelectionCurrentLevelDisplay;