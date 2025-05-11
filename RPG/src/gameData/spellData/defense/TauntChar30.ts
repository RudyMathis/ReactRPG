import Buffs, { Buff } from "../../Buffs";
import { CharacterType } from "../../../atom/CharacterAtom";

const spellCost = 30;
const isMoreInfo = true;
const additionalInfo = "Increase health/defense and forces enemy to attack you";
const TauntChar30 = (
    character: CharacterType,
): { id: number; buff: Buff } => {
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

export { spellCost, isMoreInfo, additionalInfo };
export default TauntChar30;