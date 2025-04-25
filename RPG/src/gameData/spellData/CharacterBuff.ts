import { CharacterType } from "../../atom/CharacterAtom";
import { Buff } from "../Buffs";
import buffs from "./defense/BuffsFactory";

export const CharacterBuff = (
    character: CharacterType,
    target: CharacterType,
    spell: string,
    spellCost: number
):  number 
| { id: string; health: number }[] 
| { id: string; mana: number } 
| { id: string; buff: Buff } 
| undefined => {
    const buffFn = buffs[spell];
    

    if (!buffFn) {
        console.warn(`Unknown or missing spell in buffs: "${spell}"`);
        return target.health;
    }

    const result = buffFn(character, target, spellCost);
    
    if (result === undefined) {
        console.warn(`Buff "${spell}" returned undefined.`);
        return target.health;
    }

    return result;
};
