import Buffs, { Buff } from "../../Buffs";
import { CharacterType } from "../../../atom/CharacterAtom";

const spellCost = 50;
const statValue = 25;
const isMoreInfo = true;
const additionalInfo = "Increase attack and speed";

const BerserkChar50 = (
    character: CharacterType
): { id: number; buff: Buff } => {
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

export { spellCost, statValue, isMoreInfo, additionalInfo };
export default BerserkChar50;