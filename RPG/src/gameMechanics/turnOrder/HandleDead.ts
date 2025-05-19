import EnemyAtom from "../../atom/BaseEnemyAtom";
import CharacterAtom from "../../atom/CharacterAtom";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { storeAtom } from "../../atom/storeAtom";
import { GainExperience } from "../GainExperince";
import { SubmitHighScore } from "../SubmitHighScore";
import { tutorialAtom } from "../../atom/TutorialAtom";

export const HandleAllEnemiesDead = () => {
    const allEnemiesDead = Object.values(storeAtom.get(EnemyAtom)).every(e => e.health <= 0);
    const tutorial = storeAtom.get(tutorialAtom);
    
    if (allEnemiesDead) {
        
        if (tutorial.isTutorial) {
            storeAtom.set(tutorialAtom, 
            { 
                ...tutorial, 
                isEndTutorial: true,
            });
            localStorage.removeItem('tutorialState');
        } else {
            storeAtom.set(GameLevelAtom, (prev) => ({
                ...prev,
                isRoundOver: true
            }));
        }
        
        
        storeAtom.set(CharacterAtom, prev => {
        return Object.fromEntries(Object.entries(prev).map(([id, char]) => {
            return [id, { ...char, currentTurn: false }];
        }));
        });

        const enemyAmount = Object.keys(storeAtom.get(EnemyAtom)).length;
        const characters = storeAtom.get(CharacterAtom);
        const selectedCharacters = Object.values(characters).filter(char => char.isSelected);

        GainExperience(enemyAmount, selectedCharacters.length);

        return true;
    }
    return false;
};

export const HandleAllCharactersDead = () => { 
    const selectedCharacters = Object.values(storeAtom.get(CharacterAtom)).filter(char => char.isSelected);
    const allCharactersDead =  Object.values(selectedCharacters).every(e => e.health <= 0);
    
    if (allCharactersDead) {
        SubmitHighScore();
        storeAtom.set(GameLevelAtom, (prev) => ({
            ...prev,
            isRoundOver: false,
            isHideBegin: false,
            isGameOver: true
        }));
        
        return true;
    }
    return false;
}