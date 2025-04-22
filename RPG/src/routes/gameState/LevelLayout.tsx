import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import NavigateBtn from "../../components/ui/NavigateBtn";
import Grid from "./Grid";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import CurrentLevelDisplay from "../../components/ui/CurrentLevelDisplay";
import EndofRoundDisplay from "./EndOfRoundDisplay";
import { backgroundAtom } from "../../atom/BackgroundAtom";
import './GameState.css';
import SettingsIcon from "../../components/ui/SettingsIcon";

const LevelLayout = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const isRoundOver = currentGameLevel.isRoundOver;
    localStorage.setItem('inProgressGame', 'true')
    const [background] = useAtom(backgroundAtom);

    return (
        <div className="level-layout">
            <div className="top-bar">
                <NavigateBtn locationValue="/" location="Menu" />
                <SettingsIcon />
                <TurnOrderDisplay />
                <CurrentLevelDisplay />
            </div>
            <img src={`/assets/backgrounds/${background}.png`} className="glow" data-glow={background} />
            <div className="crt"></div>
            <Grid />
            {isRoundOver && <EndofRoundDisplay />}
        </div>
    );
}

export default LevelLayout;
