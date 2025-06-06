import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { RemoveData } from "../../gameMechanics/RemoveData";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { generateTutorialEnemies } from "../../gameData/enemies/EnemyFactory";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import characterAtom, { CharacterType } from "../../atom/CharacterAtom";
import CharacterData from "../../gameData/characters/CharacterData.json";
import { tutorialAtom } from "../../atom/TutorialAtom";
import { generateNewBackground } from "../../atom/BackgroundAtom";
import { getTutorialStep } from './getTutorialStep';


export const useHandleTutorialStart = () => {
    const [, setCharacters] = useAtom(characterAtom);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const [, setCurrentTurn] = useAtom(turnCountAtom);
    const [, setEnemies] = useAtom(EnemyAtom);
    const navigate = useNavigate();
    const [, setTutorial] = useAtom(tutorialAtom);

    return () => {
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

        const newBackground = generateNewBackground();
        localStorage.setItem("background", newBackground);

        const firstStep = getTutorialStep(0);
        if (firstStep) setTutorial(firstStep);
        setCharacters(tutorialCharacters);
        setEnemies(() => generateTutorialEnemies());

        navigate('/game');
    };
};