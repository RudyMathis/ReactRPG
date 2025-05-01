import { actionsTextAtom } from "../../atom/ActionsTextAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { storeAtom } from "../../atom/storeAtom";
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

    storeAtom.set(actionsTextAtom, { 
        entity: character,
        action: `${buffs[spell].name}`,
        value: `${character.attack}`,
        target: target,
        isAttack: false,
        isDefense: true,
        isAoe: buffs[spell].isAoe,
        isBuff: buffs[spell].isBuff,
    });

    return result;
};
