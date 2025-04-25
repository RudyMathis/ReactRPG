import Buffs, { Buff } from "../../Buffs";
import { CharacterType } from "../../../atom/CharacterAtom";

const BerserkChar50 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: string; buff: Buff } => {

    spellCost = 50;
    character.mana -= spellCost;

    if (character.buffs.find(d => d.type === Buffs.Berserk.type)) {
        return { id: character.id.toString(), buff: Buffs.Berserk };
    } else {
        character.buffs.push({
            type: Buffs.Berserk.type, 
            duration: 3,
            attack: Buffs.Berserk.attack,
            name: Buffs.Berserk.name
        });
        character.attack = character.attack + Buffs.Berserk.attack;
        character.speed = character.speed + Buffs.Berserk.attack;
        return { id: character.id.toString(), buff: Buffs.Berserk };
    }

};

export default BerserkChar50;