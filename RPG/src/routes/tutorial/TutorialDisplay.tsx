import { useTutorialManager } from './useTutorialManager';
import styles from './Tutorial.module.css';
import Btn from '../../components/ui/Btn';
import NavigateBtn from "../../components/ui/NavigateBtn";
import { toggleMenuAtom } from '../../atom/ToggleMenuAtom';
import { useAtom } from 'jotai';

const TutorialDisplay = () => {
    const { tutorial, next, prev } = useTutorialManager();
    const [, toggleMenu] = useAtom(toggleMenuAtom);
    const handleToggleMenu = (id: null, type: null) => {
        toggleMenu({ id, type });
    };

    // if (!tutorial.isTutorialVisible) return null;

    return (
        <section className={styles.tutorialContainer} data-is-visible={tutorial.isTutorialVisible}>
            <div className={styles.tutorialOverlay} data-tutorial-layer='bottom' onClick={() => handleToggleMenu(null, null)}></div>
            <div className={styles.tutorialTextContainer} data-position={tutorial.tutorialTextPosition} data-tutorial-layer='top'>
                <p className={styles.tutorialText}>{tutorial.tutorialText}</p>
                <div className={styles.tutorialButtonContainer}>
                    {tutorial.isPrevTutorial && <Btn onClick={() => { prev(); handleToggleMenu(null, null);}} text="Back" />}
                    {tutorial.isNextTutorial && <Btn onClick={() => { next(); handleToggleMenu(null, null);}} text="Next" />}
                    {tutorial.isEndTutorial && <NavigateBtn locationValue="/" location="Main Menu" />}
                </div>
            </div>
        </section>
    );
};

export default TutorialDisplay;