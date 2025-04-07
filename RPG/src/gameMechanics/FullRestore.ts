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
                };
            }
            return char;
        });
        console.log("FULL RESTORE",updatedCharacters);
    
        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};