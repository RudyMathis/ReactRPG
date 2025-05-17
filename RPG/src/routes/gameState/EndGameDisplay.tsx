import NavigateBtn from "../../components/ui/NavigateBtn";
import ScoreDisplay from "../../components/ui/ScoreDisplay";
import styles from "./GameState.module.css";

const EndGameDisplay = () => {
    return (
        <div className={styles.endGameDisplay}>
            <h1>Game Over</h1>
            <ScoreDisplay />
            <NavigateBtn locationValue="/" location="Main Menu" />
        </div>
    );
};

export default EndGameDisplay;