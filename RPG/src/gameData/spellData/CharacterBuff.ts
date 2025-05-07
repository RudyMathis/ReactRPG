import { actionsTextAtom } from "../../atom/ActionsTextAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { storeAtom } from "../../atom/storeAtom";
import CharacterBuffResult from "../characters/CharacterBuffResultType";
import buffs from "./defense/BuffsFactory";
import { DefenseAnimationAtom } from "../../atom/effects/DefenseAnimationAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";


export const CharacterBuff = (
    character: CharacterType,
    target: CharacterType,
    spell: string,
    spellCost: number
):  CharacterBuffResult  => {

    setTimeout(() => {
        storeAtom.set(DefenseAnimationAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 1000);

    const spellAnimation = buffs[spell]?.animation;

    if (spellAnimation) {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [target.id]: spellAnimation.name,
            duration: spellAnimation.duration,
            width: spellAnimation.width,
            height: spellAnimation.height,
            steps: spellAnimation.steps,
            image: spellAnimation.image,
        }));
    } else {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [target.id]: null,
        }));
    }

    storeAtom.set(DefenseAnimationAtom, (prev) => ({ ...prev, [character.id]: true }));
    if (spellAnimation) {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [target.id]: spellAnimation.name,
            duration: spellAnimation.duration,
            width: spellAnimation.width,
            height: spellAnimation.height,
            steps: spellAnimation.steps,
            image: spellAnimation.image,
        }));
    
        setTimeout(() => {
            storeAtom.set(FlashAnimationAtom, (prev) => ({
                ...prev,
                [target.id]: null,
            }));
        }, 900);
    }
    
    setTimeout(() => {
    }, 2000);

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