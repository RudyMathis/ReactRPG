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

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    if (!character.buffs.find(d => d.name === Buffs.Protected.buffName)) {
        character.defense = character.defense + Buffs.Protected.defense;
        character.buffs.push(
            {
                name: Buffs.Protected.buffName,
                type: Buffs.Protected.type,
                duration: 3,
            }
        );
    }

    selectedCharacters.forEach(targetChar => {
        if (!targetChar.buffs.find(d => d.name === Buffs.Protected.buffName)) {
            targetChar.defense = targetChar.defense + Buffs.Protected.defense;
            targetChar.buffs.push(
                {
                    name: Buffs.Protected.buffName,
                    type: Buffs.Protected.type,
                    duration: 3,
                }
            );
        }
    });

    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.Protected }));
};

export default ProtectPartyChar50;
