import { useNavigate } from "react-router";
import Btn from "../../components/ui/Btn";
import { useAtom, useSetAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { RemoveData } from "../../gameMechanics/RemoveData";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { generateTutorialEnemies } from "../../gameData/enemies/EnemyFactory";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import characterAtom, { CharacterType } from "../../atom/CharacterAtom";
import CharacterData from "../../gameData/characters/CharacterData.json";
import { tutorialAtom } from "../../atom/TutorialAtom";
import { generateNewBackground } from "../../atom/BackgroundAtom";

export const TutorialBtn = () => {
    const [, setCharacters] = useAtom(characterAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const [, setCurrentTurn] = useAtom(turnCountAtom);
    const [, setEnemies] = useAtom(EnemyAtom);
    const setTutorial = useSetAtom(tutorialAtom);
    const navigate = useNavigate();


    const handleStart = () => {
        RemoveData();
        localStorage.setItem('inProgressGame', 'false');
        localStorage.setItem('Score', '0');
        localStorage.setItem('turnCount', '0');
        setCurrentTurn(0);

        currentGameLevel.isRoundOver = false;
        currentGameLevel.isLevelOver = false;
        currentGameLevel.isGameOver = false;
        currentGameLevel.isHideBegin = false;
        currentGameLevel.level = 1;
        currentGameLevel.round = 1;

        const tutorialCharacters: { [id: number]: CharacterType } = {};
        for (const char of Object.values(CharacterData)) {
            if (char.isTutorial) {
                tutorialCharacters[char.id] = {
                    ...char,
                    level: 1,
                    isSelected: true,
                    buffs: [],
                    debuffs: [],
                    currentTurn: false,
                };
            }
        }
        setTutorial({isTutorial: true});
        const newBackground = generateNewBackground();
        localStorage.setItem("background", newBackground);

        setCharacters(tutorialCharacters);
        setEnemies(() => generateTutorialEnemies());

        navigate('/game');
    };

    return <Btn onClick={handleStart} text="Tutorial" />;
};