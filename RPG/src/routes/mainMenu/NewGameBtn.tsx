import { useNavigate } from "react-router";
import Btn from "../../components/ui/Btn";
import characterAtom, { CharacterType } from "../../atom/CharacterAtom";
import CharacterData  from "../../gameData/characters/CharacterData.json";
import { useAtom, useSetAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import { generateInitialEnemies } from "../../gameData/enemies/EnemyFactory";
import { RemoveData } from "../../gameMechanics/RemoveData";
import { backgroundAtom, generateNewBackground } from "../../atom/BackgroundAtom";

export const NewGameBtn = () => {
    const navigate = useNavigate();
    const [, setCharacters] = useAtom(characterAtom);
    const [, setEnemies] = useAtom(EnemyAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const setBackground = useSetAtom(backgroundAtom);
    const handleStart = () => {
        RemoveData();
        const newBackground = generateNewBackground();
        localStorage.setItem("background", newBackground);
        setBackground(newBackground);
        
        setCharacters(() => {
            const resetCharacters: { [id: number]: CharacterType } = {};
            for (const char of Object.values(CharacterData)) {
                resetCharacters[char.id] = {
                    ...char,
                    level: 1,
                    isSelected: false,
                    buffs: [],
                    debuffs: [],
                    currentTurn: false,

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
        currentGameLevel.background = newBackground;
        navigate('/select-character');
    };
    
    
    return <Btn onClick={handleStart} text="New Game" className="newGameBtn" />
};