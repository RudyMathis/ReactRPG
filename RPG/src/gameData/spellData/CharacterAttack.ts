import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";
import { AttackAnimationAtom } from "../../atom/effects/AttackAnimationAtom";
import { storeAtom } from "../../atom/storeAtom";
import attacks from "./attacks/Attacks";
import { actionsTextAtom } from "../../atom/ActionsTextAtom";

export const CharacterAttack = (enemy: EnemyType, character: CharacterType, _target: EnemyType | CharacterType, spell: string, spellCost: number) => {

    setTimeout(() => {
        storeAtom.set(AttackAnimationAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 1000);

const spellAnimation = attacks[spell]?.animation;
    if (spellAnimation) {
        storeAtom.set(FlashAnimationAtom, (prev) => ({
            ...prev,
            [enemy.id]: spellAnimation.name,
            duration: spellAnimation.duration,
            width: spellAnimation.width,
            height: spellAnimation.height,
            steps: spellAnimation.steps,
            image: spellAnimation.image,
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
            [enemy.id]: spellAnimation.name,
            duration: spellAnimation.duration,
            width: spellAnimation.width,
            height: spellAnimation.height,
            steps: spellAnimation.steps,
            image: spellAnimation.image,
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
        storeAtom.set(actionsTextAtom, { 
            entity: character, 
            action: attacks[spell].name,
            value: `${character.attack}`,
            target: enemy,
            isAttack: true,
            isDefense: false,
            isAoe: attacks[spell].aoe,
        });
        return attacks[spell].func(enemy, character, enemy, spellCost);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        storeAtom.set(actionsTextAtom, {
            entity: character,
            action: 'Attack',
            value: `${character.attack}`,
            target: enemy,
            isAttack: true,
            isDefense: false,
            isAoe: false,
        });
        return enemy.health - Math.max(5, character.attack - enemy.defense);
    }

};