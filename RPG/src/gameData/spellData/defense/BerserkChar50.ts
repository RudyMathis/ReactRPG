import Buffs, { Buff } from "../../Buffs";
import { CharacterType } from "../../../atom/CharacterAtom";

const BerserkChar50 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: number; buff: Buff } => {

    spellCost = 50;
    character.mana -= spellCost;

    if (character.buffs.find(d => d.name === Buffs.Berserk.buffName)) {
        return { id: character.id, buff: Buffs.Berserk };
    } else {
        character.buffs.push({
            name: Buffs.Berserk.buffName,
            type: Buffs.Berserk.type, 
            duration: 3,
        });
        character.attack = character.attack + Buffs.Berserk.attack;
        character.speed = character.speed + Buffs.Berserk.speed;
        return { id: character.id, buff: Buffs.Berserk };
    }

};

export default BerserkChar50;