import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const FullRestore = () => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => {
            if (char.isSelected) {
                
                return {
                    ...char,
                    health: char.maxHealth,
                    mana: char.maxMana,
                    debuffs: [],
                    buffs: [],
                    speed: char.speedDefault,
                    attack: char.attackDefault,
                    defense: char.defenseDefault
                };
            }
            return char;
        });
    
        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};