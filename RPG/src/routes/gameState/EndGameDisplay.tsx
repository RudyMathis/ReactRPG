import { useAtomValue } from "jotai";
import { tutorialAtom } from "../../atom/TutorialAtom";
import NavigateBtn from "../../components/ui/NavigateBtn";
import ScoreDisplay from "../../components/ui/ScoreDisplay";
import styles from "./GameState.module.css";

const EndGameDisplay = () => {
    const tutorial = useAtomValue(tutorialAtom);

    return (
        <div className={styles.endGameDisplay}>
            {tutorial?.isTutorial === true 
            ? 
            <>
                <p>That's a full round!</p>
                <p>Now that you have the hang of it go back to the menu and start a new game.</p>
            </>
            : <h1>Game Over</h1>}
            {!tutorial?.isTutorial && <ScoreDisplay />}
            <NavigateBtn locationValue="/" location="Main Menu" />
        </div>
    );
};

export default EndGameDisplay;