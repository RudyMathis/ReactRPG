import CharacterSheets from "./CharacterSheets";
import NavigateBtn from "../../components/NavigateBtn";
import "./CharacterSelect.css";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { useAtom } from "jotai";
// import { useEffect, useState } from "react";

const CharacterSelect = () => {

    const [currentGameLevel] = useAtom(GameLevelAtom);
    // const [message, setMessage] = useState<string>('');

    // useEffect(() => {
    //     fetch('http://localhost:8080/api/greeting')
    //         .then(response => response.text())
    //         .then(data => setMessage(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    return (
        <>
            <div className="main-container">           
                <h1>Select Your Character</h1>
                {/* <h2>{message}</h2> */}
                <NavigateBtn locationValue="/" location="Main Menu" />
            </div>
            <CharacterSheets />
            <NavigateBtn locationValue={`/game/${currentGameLevel.level}-${currentGameLevel.round}`} location="Begin your adventure" />
        </>
    );
};

export default CharacterSelect;  