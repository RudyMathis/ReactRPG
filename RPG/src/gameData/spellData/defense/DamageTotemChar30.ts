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

    if(!character.buffs.find(d => d.name === Buffs.DamageTotem.buffName)) {
        character.attack = character.attack + Buffs.DamageTotem.attack;
        character.buffs.push(
            {
                name: Buffs.DamageTotem.buffName,
                type: Buffs.DamageTotem.type,
                duration: 3,
            }
        );
    }

    selectedCharacters.map(targetChar => {
        if (!targetChar.buffs.find(d => d.name === Buffs.DamageTotem.buffName)) {
            targetChar.attack = targetChar.attack + Buffs.DamageTotem.attack;
            targetChar.buffs.push(
                {
                    name: Buffs.DamageTotem.buffName,
                    type: Buffs.DamageTotem.type,
                    duration: 3,
                }
            );
        }
    });


    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.DamageTotem }));
};

export default DamageTotemChar30;
