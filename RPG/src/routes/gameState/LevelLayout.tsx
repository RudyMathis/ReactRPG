import Grid from "./Grid";
import NavigateBtn from "../../components/NavigateBtn";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
const LevelLayout = () => {

    return (
        <div className="level-layout">
            <h1>Level Layout</h1>
            <TurnOrderDisplay />
            <Grid />
            <NavigateBtn locationValue="/" location="Start Menu" />
        </div>
    );
}

export default LevelLayout