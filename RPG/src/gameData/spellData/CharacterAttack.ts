import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";
import { AttackAnimationAtom } from "../../atom/effects/AttackAnimationAtom";
import { storeAtom } from "../../atom/storeAtom";
import { AdditionalBlessingDamage } from "./AdditionalBlessingDamage";
import attacks from "./attacks/Attacks";

export const CharacterAttack = (enemy: EnemyType, character: CharacterType, _target: EnemyType | CharacterType, spell: string, spellCost: number) => {

    setTimeout(() => {
        storeAtom.set(AttackAnimationAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 1000);

const spellAnimation = attacks[spell]?.animation;
    if (spellAnimation) {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [enemy.id]: spellAnimation,
        }));
    } else {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [enemy.id]: null,
        }));
    }


    storeAtom.set(AttackAnimationAtom, (prev) => ({ ...prev, [character.id]: true }));
    if (spellAnimation) {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [enemy.id]: spellAnimation,
        }));
    
        setTimeout(() => {
            storeAtom.set(FlashAnimationAtom, (prev) => ({
                ...prev,
                [enemy.id]: null,
            }));
        }, 900); // match animation length
    }
    

    setTimeout(() => {
    }, 2000);

    if (attacks[spell]) {
        return attacks[spell].func(enemy, character, enemy, spellCost);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
    }

};