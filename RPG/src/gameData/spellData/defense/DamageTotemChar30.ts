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

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    selectedCharacters.map(targetChar => {
        if (!targetChar.buffs.find(d => d.name === Buffs.DamageTotem.name)) {
            targetChar.attack = targetChar.attack + Buffs.DamageTotem.attack;
        }
    });

    if(!character.buffs.find(d => d.name === Buffs.DamageTotem.name)) {
        character.attack = character.attack + Buffs.DamageTotem.attack;
    }

    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.DamageTotem }));
};

export default DamageTotemChar30;
