import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const ManaRegen = () => {
    const manaRegenAmount = 10;
    const energryRegenAmount = 30;

    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => ({
            ...char,
            mana: char.health > 0 
            ? char.resource_type === "mana" 
            ? Math.min(char.mana + manaRegenAmount, char.maxMana) 
            : char.resource_type === "energy" 
            ? Math.min(char.mana + energryRegenAmount, char.maxMana)
            : char.resource_type === "rage" 
            ? 0  
            : char.mana 
            : char.mana, // If dead, don't change mana
        }));
    
        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });   
}