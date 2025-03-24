import Grid from "./Grid";
import NavigateBtn from "../../components/NavigateBtn";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import './LevelLayout.css'
const LevelLayout = () => {

    return (
        <div className="level-layout">
            <NavigateBtn locationValue="/" location="Start Menu" />
            <Grid />
            <TurnOrderDisplay />
        </div>
    );
}

export default LevelLayout