import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/NavigateBtn";
import "./CharacterSelect.css";
import CharacterAtom from "../../atom/CharacterAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import Btn from "../../components/Btn";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { SaveData } from "../../gameMechanics/SaveData";

const CharacterSelect = () => {

    // const [currentGameLevel] = useAtom(GameLevelAtom);
    // const [message, setMessage] = useState<string>('');

    // useEffect(() => {
    //     fetch('http://localhost:8080/api/greeting')
    //         .then(response => response.text())
    //         .then(data => setMessage(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);
    const [characters] = useAtom(CharacterAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const navigate = useNavigate();
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);

    const handleBeginAdventure = () => {
        if (selectedCharacters.length !== 3) return;

        localStorage.setItem("selectedParty", "true");
        SaveData();
        currentGameLevel.isRoundOver = false
        navigate("/game");
    };

    return (
        <>
            <div className="main-container">           
                <h1>Select Your Character</h1>
                {/* <h2>{message}</h2> */}
                <NavigateBtn locationValue="/" location="Main Menu" />
            </div>
            <CharacterSheets />

            <Btn 
                className="start-game-btn"
                onClick={handleBeginAdventure}
                disabled={selectedCharacters.length !== 3}
                text="Begin Adventure"
            />
        </>
    );
};

export default CharacterSelect;  