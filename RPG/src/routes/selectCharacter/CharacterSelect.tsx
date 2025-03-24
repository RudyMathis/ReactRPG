import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/NavigateBtn";
import "./CharacterSelect.css";

const CharacterSelect = () => {

    return (
        <>
            <div className="main-container">           
                <h1>Select Your Character</h1>
                <NavigateBtn locationValue="/" location="Main Menu" />
            </div>
            <CharacterSheets />
            <NavigateBtn className="adventure" locationValue="/game" location="Begin your adventure" />
        </>
    );
};

export default CharacterSelect;  