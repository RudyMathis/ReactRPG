import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const GainExperience = (enemyAmount: number) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => {
            if (char.health > 0 && char.isSelected) {
                const newExp = char.exp + char.level * 10 * enemyAmount;
                const newLevel = newExp >= char.maxExp ? char.level + 1 : char.level;
                const newMaxExp = newLevel > char.level ? char.maxExp + char.level * 100 : char.maxExp;
                const levelUp = char.level * 3;
                
                return {
                    ...char,
                    exp: newExp,
                    level: newLevel,
                    maxExp: newMaxExp,
                    health: char.health + levelUp,
                    maxHealth: char.maxHealth + levelUp,
                    attack: char.attack + levelUp,
                    defense: char.defense + levelUp,
                    speed: char.speed + levelUp,
                    speedDefault: char.speedDefault + levelUp,
                    mana: char.maxMana > 0 ? char.mana + levelUp : 0,
                    maxMana: char.maxMana > 0 ? char.maxMana + levelUp: 0,
                };
            }
            return char;
        });
        console.log("EXPERINCE GAIN", updatedCharacters);
    
        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};