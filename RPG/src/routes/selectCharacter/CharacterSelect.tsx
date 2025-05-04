import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/ui/NavigateBtn";
import CharacterAtom from "../../atom/CharacterAtom";
import { useAtom, useSetAtom } from "jotai";
import { useNavigate } from "react-router";
import Btn from "../../components/ui/Btn";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { SaveData } from "../../gameMechanics/SaveData";
import Background from "../../components/ui/Background";
import styles from "../Route.module.css";
import { backgroundAtom, generateNewBackground } from "../../atom/BackgroundAtom";
import UserNameInput from "../mainMenu/UserNameInput";
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
    const setBackground = useSetAtom(backgroundAtom);
    const handleBeginAdventure = () => {
        if (selectedCharacters.length !== 4) return;

        const newBackground = generateNewBackground();

        localStorage.setItem("background", newBackground);
        localStorage.setItem("selectedParty", "true");
        setBackground(newBackground);
        SaveData();
        currentGameLevel.isRoundOver = false
        currentGameLevel.background = newBackground;

        navigate("/game");
    };

    return (
        <>
            <div className={styles.mainContainer}>   
                <div className={styles.topBar}>
                <h1>Select Your Character</h1>
                {/* <h2>{message}</h2> */}
                <NavigateBtn locationValue="/" location="Main Menu" />
                    </div>        
                <CharacterSheets />
            </div>
            <div className={`${styles.startContainer} ${selectedCharacters.length !== 4 ? styles.hide : ''}`}>
                <UserNameInput />
                <Btn 
                    className={styles.startGameBtn}
                    onClick={handleBeginAdventure}
                    text="Begin Adventure"
                />
            </div>
            <Background />
        </>
    );
};
export default CharacterSelect;  