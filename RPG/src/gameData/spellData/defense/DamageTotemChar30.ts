import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Buffs, { Buff } from "../../Buffs";

const DamageTotemChar30 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: number; buff: Buff }[] => {

    spellCost = 30;
    character.mana -= spellCost;
    const updatedCharacters: { id: number; buff: Buff }[] = [];

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    selectedCharacters.forEach(targetChar => {
        if (!targetChar.buffs.find(d => d.name === Buffs.DamageTotem.name)) {
            // Only add if they don't already have it
            targetChar.buffs.push({
                type: Buffs.DamageTotem.type, 
                duration: 3,
                attack: Buffs.DamageTotem.attack,
                name: Buffs.DamageTotem.name
            });
            targetChar.attack += Buffs.DamageTotem.attack;
        }
        console.log("targetChar", targetChar, targetChar.buffs, "updatedCharacters", updatedCharacters);
        updatedCharacters.push({ id: targetChar.id, buff: Buffs.DamageTotem });
    });

    return updatedCharacters;
};

export default DamageTotemChar30;
