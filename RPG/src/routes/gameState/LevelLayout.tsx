import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import NavigateBtn from "../../components/ui/NavigateBtn";
import Grid from "./Grid";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import CurrentLevelDisplay from "../../components/ui/CurrentLevelDisplay";
import EndofRoundDisplay from "./EndOfRoundDisplay";
import './LevelLayout.css';

const LevelLayout = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const isRoundOver = currentGameLevel.isRoundOver;
    localStorage.setItem('inProgressGame', 'true')

    return (
        <>
            <div className="top-bar">
                <NavigateBtn locationValue="/" location="Start Menu" />
                <CurrentLevelDisplay />
            </div>
            <div className="level-layout">
                <Grid />
                <TurnOrderDisplay />
                {isRoundOver && <EndofRoundDisplay />}
            </div>
        </>
    );
}

export default LevelLayout;
