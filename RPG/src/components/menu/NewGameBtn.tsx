import { useNavigate } from "react-router";
import Btn from "../Btn";
import characterAtom, { CharacterType } from "../../atom/CharacterAtom";
import CharacterData  from "../../gameData/characters/CharacterData.json";
import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import { generateInitialEnemies } from "../../gameData/EnemyFactory";
export const NewGameBtn = () => {
    const navigate = useNavigate();
    const [, setCharacters] = useAtom(characterAtom);
    const [, setEnemies] = useAtom(EnemyAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    
    const handleStart = () => {
        localStorage.removeItem("currentTurn");
        localStorage.removeItem("characters");
        localStorage.removeItem("enemies");
        localStorage.removeItem("turnCount");
        localStorage.removeItem("Level");
        localStorage.removeItem("Round");
    
        setCharacters(() => {
            const resetCharacters: { [id: number]: CharacterType } = {};
            for (const char of Object.values(CharacterData)) {
                resetCharacters[char.id] = {
                    ...char,
                    isSelected: false
                };
            }
            return resetCharacters;
        });
    
        setEnemies(() => generateInitialEnemies());
    
        localStorage.setItem('inProgressGame', 'false');
        currentGameLevel.isRoundOver = false;
        currentGameLevel.isLevelOver = false;
        currentGameLevel.level = 1;
        currentGameLevel.round = 1;
        navigate('/select-character');
    };
    
    
    return <Btn onClick={handleStart} text="New Game" className="newGameBtn" />
};