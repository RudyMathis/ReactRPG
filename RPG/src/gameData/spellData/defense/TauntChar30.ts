import Buffs, { Buff } from "../../Buffs";
import { CharacterType } from "../../../atom/CharacterAtom";

const TauntChar30 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: number; buff: Buff } => {

    spellCost = 30;
    character.mana -= spellCost;

    if (character.buffs.find(d => d.name === Buffs.Taunter.buffName)) {
        return { id: character.id, buff: Buffs.Taunter };
    } else {
        character.buffs.push({
            type: Buffs.Taunter.type, 
            duration: 3,
            defense: Buffs.Taunter.defense,
            health: Buffs.Taunter.health,
            name: Buffs.Taunter.buffName
        });
        character.defense = character.defense * Buffs.Taunter.defense;
        character.health = character.health * Buffs.Taunter.health;
        return { id: character.id, buff: Buffs.Taunter };
    }

};

export default TauntChar30;