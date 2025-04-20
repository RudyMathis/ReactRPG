import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import ScoreDisplay from "./ScoreDisplay";
import './UI.css'

const CurrentLevelDisplay = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);

    return (
        <div className="current-display-container">
            <ScoreDisplay/>
            <h2 className="current-level-text">Current {currentGameLevel.level} - {currentGameLevel.round}</h2>
        </div>
    );
}

export default CurrentLevelDisplay;