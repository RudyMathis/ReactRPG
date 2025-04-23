import { CharacterType } from "../../atom/CharacterAtom";
import buffs from "./buffs/Buffs";

export const CharacterBuff = (
    character: CharacterType,
    target: CharacterType,
    spell: string,
    spellCost: number
): number | { id: string; health: number }[] => {
    if (!buffs[spell]) {
        console.warn(`Unknown or missing spell in buffs: "${spell}"`);
        return target.health;
    }
    return buffs[spell](character, target, spellCost);
};
