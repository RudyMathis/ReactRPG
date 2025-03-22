import Grid from "./Grid";
import NavigateBtn from "../../components/NavigateBtn";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
const LevelLayout = () => {

    return (
        <div className="level-layout">
            <TurnOrderDisplay />
            <Grid />
            <NavigateBtn locationValue="/" location="Start Menu" />
        </div>
    );
}

export default LevelLayout