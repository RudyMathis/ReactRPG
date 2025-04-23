import EnemyAtom from "../../atom/BaseEnemyAtom";
import CharacterAtom from "../../atom/CharacterAtom";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import { storeAtom } from "../../atom/storeAtom";
import { GainExperience } from "../GainExperince";

export const HandleAllEnemiesDead = () => {
    const allEnemiesDead = Object.values(storeAtom.get(EnemyAtom)).every(e => e.health <= 0);

    if (allEnemiesDead) {
        storeAtom.set(GameLevelAtom, (prev) => ({
            ...prev,
            isRoundOver: true  
        }));
        
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
        storeAtom.set(GameLevelAtom, (prev) => ({
            ...prev,
            isRoundOver: false,
            isGameOver: true
        }));
        console.log(`Game Over. ${allCharactersDead}. You Lose`);
        return true; // Stop running turns
    }
    return false;
}