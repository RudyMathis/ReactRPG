import { CharacterType } from "../../atom/CharacterAtom";
import buffs from "./buffs/Buffs";
export const CharacterBuff = (character: CharacterType, target: CharacterType, spell: string, spellCost: number) => {
    setTimeout(() => {
    }, 2700);

    if (!buffs[spell]) {
        console.warn(`Unknown or missing spell in buffs: "${spell}"`);
        return target.health; // Return unchanged health if spell is not found
    }
    return buffs[spell](character, target, spellCost);
};