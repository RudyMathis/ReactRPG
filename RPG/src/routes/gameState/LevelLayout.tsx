import Grid from "./Grid";
import GameMenuBase from "./gameMenu/GameMenuBase";
import NavigateBtn from "../../components/NavigateBtn";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
const LevelLayout = () => {

    return (
        <div className="level-layout">
            <h1>Level Layout</h1>
            <TurnOrderDisplay />
            <Grid />
            {/* title */}
            {/* menu btn */}
            {/* board layout */}
            {/* character container info */}
            <GameMenuBase />
            <NavigateBtn locationValue="/" location="Start Menu" />
        </div>
    );
}

export default LevelLayout