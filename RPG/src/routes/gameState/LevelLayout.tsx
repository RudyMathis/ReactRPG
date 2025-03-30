import NavigateBtn from "../../components/NavigateBtn";
import Grid from "./Grid";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import CurrentLevelDisplay from "../../components/CurrentLevelDisplay";
import './LevelLayout.css'
const LevelLayout = () => {

    return (
        <div className="level-layout">
            <div className="top-bar">
                <NavigateBtn locationValue="/" location="Start Menu" />
                <CurrentLevelDisplay />
            </div>
            <Grid />
            <TurnOrderDisplay />
        </div>
    );
}

export default LevelLayout