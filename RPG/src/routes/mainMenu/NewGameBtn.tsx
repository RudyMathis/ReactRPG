import { useNavigate } from "react-router";
import Btn from "../../components/ui/Btn";
import characterAtom, { CharacterType } from "../../atom/CharacterAtom";
import CharacterData  from "../../gameData/characters/CharacterData.json";
import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import { generateInitialEnemies } from "../../gameData/enemies/EnemyFactory";
import { RemoveData } from "../../gameMechanics/RemoveData";

export const NewGameBtn = () => {
    const navigate = useNavigate();
    const [, setCharacters] = useAtom(characterAtom);
    const [, setEnemies] = useAtom(EnemyAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);

    const handleStart = () => {
        RemoveData();
        
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
        localStorage.setItem('Score', '0');
        localStorage.setItem('turnCount', '0');
        currentGameLevel.isRoundOver = false;
        currentGameLevel.isLevelOver = false;
        currentGameLevel.isGameOver = false;
        currentGameLevel.level = 1;
        currentGameLevel.round = 1;
        navigate('/select-character');
    };
    
    return <Btn onClick={handleStart} text="New Game" />
};