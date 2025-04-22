import NavigateBtn from "../../components/ui/NavigateBtn";
import ScoreDisplay from "../../components/ui/ScoreDisplay";

const EndGameDisplay = () => {
    return (
        <div className="end-game-display">
            <h1>Game Over</h1>
            <ScoreDisplay />
            <NavigateBtn locationValue="/" location="Main Menu" />
        </div>
    );
};

export default EndGameDisplay;