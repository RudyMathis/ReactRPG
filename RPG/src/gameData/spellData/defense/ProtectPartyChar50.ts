import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Buffs, { Buff } from "../../Buffs";

const ProtectPartyChar50 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: number; buff: Buff }[] => {

    spellCost = 50;
    character.mana -= spellCost;
    const updatedCharacters: { id: number; buff: Buff }[] = [];

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    selectedCharacters.forEach(targetChar => {
        if (!targetChar.buffs.find(d => d.name === Buffs.Protected.name)) {
            // Only add if they don't already have it
            targetChar.buffs.push({
                type: Buffs.Protected.type, 
                duration: 3,
                defense: Buffs.Protected.defense,
                name: Buffs.Protected.name
            });
            targetChar.defense += Buffs.Protected.defense;
        }
        // console.log("targetChar", targetChar, targetChar.buffs, "updatedCharacters", updatedCharacters);
        updatedCharacters.push({ id: targetChar.id, buff: Buffs.Protected });
    });
    console.log("updatedCharacters", selectedCharacters.map(char => ({ id: char.id, buff: Buffs.Protected })));
    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.Protected }));
};

export default ProtectPartyChar50;
