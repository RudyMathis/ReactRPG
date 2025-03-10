import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/NavigateBtn";
import "./CharacterSelect.css";

const CharacterSelect = () => {

    return (
        <div className="character-select-container">
            <div className="main-container">           
                <h1>Select Your Character</h1>
                <NavigateBtn locationValue="/" location="Main Menu" />
            </div>
            <CharacterSheets />
            <NavigateBtn locationValue="/game" location="Begin your adventure" />
        </div>
    );
};

export default CharacterSelect;  