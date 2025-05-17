import { useTutorialManager } from './useTutorialManager';
import styles from './Tutorial.module.css';
import Btn from '../../components/ui/Btn';
import NavigateBtn from "../../components/ui/NavigateBtn";

const TutorialDisplay = () => {
    const { tutorial, next, prev } = useTutorialManager();

    if (!tutorial.isTutorialVisible) return null;

    return (
        <section className={styles.tutorialContainer} data-tutorial-layer='layer2' data-is-visible={tutorial.isTutorialVisible}>
            <div className={styles.tutorialOverlay} data-type={tutorial.tutorialOverlayType} data-tutorial-layer='layer3'></div>
            <div className={styles.tutorialOverlayHole} data-type={tutorial.tutorialOverlayType} data-tutorial-layer='layer3'></div>
            <div className={styles.tutorialTextContainer} data-position={tutorial.tutorialTextPosition} data-tutorial-layer='layer4'>
                <p className={styles.tutorialText}>{tutorial.tutorialText}</p>
                <div className={styles.tutorialButtonContainer}>
                    {tutorial.isPrevTutorial && <Btn onClick={prev} text="Back" />}
                    {tutorial.isNextTutorial && <Btn onClick={next} text="Next" />}
                    {tutorial.isEndTutorial && <NavigateBtn locationValue="/" location="Main Menu" />}
                </div>
            </div>
        </section>
    );
};

export default TutorialDisplay;