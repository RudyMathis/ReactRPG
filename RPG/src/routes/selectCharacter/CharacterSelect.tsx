import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/NavigateBtn";
import "./CharacterSelect.css";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { useAtom } from "jotai";

const CharacterSelect = () => {

    const [currentGameLevel] = useAtom(GameLevelAtom);

    return (
        <>
            <div className="main-container">           
                <h1>Select Your Character</h1>
                <NavigateBtn locationValue="/" location="Main Menu" />
            </div>
            <CharacterSheets />
            <NavigateBtn locationValue={`/game/${currentGameLevel.level}-${currentGameLevel.round}`} location="Begin your adventure" />
        </>
    );
};

export default CharacterSelect;  