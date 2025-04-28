import { CharacterType } from "../../atom/CharacterAtom";
import CharacterBuffResult from "../characters/CharacterBuffResultType";
import buffs from "./defense/BuffsFactory";

export const CharacterBuff = (
    character: CharacterType,
    target: CharacterType,
    spell: string,
    spellCost: number
):  CharacterBuffResult  => {
    const buffFn = buffs[spell];
    

    if (!buffFn) {
        console.warn(`Unknown or missing spell in buffs: "${spell}"`);
        return target.health;
    }

    const result = buffFn.func(character, target, spellCost);
    
    if (result === undefined) {
        console.warn(`Buff "${spell}" returned undefined.`);
        return target.health;
    }

    return result;
};
