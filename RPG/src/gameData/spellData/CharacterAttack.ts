import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";
import { AttackAnimationAtom } from "../../atom/effects/AttackAnimationAtom";
import { storeAtom } from "../../atom/storeAtom";
import { AdditionalBlessingDamage } from "./AdditionalBlessingDamage";
import attacks from "./attacks/Attacks";

export const CharacterAttack = (enemy: EnemyType, character: CharacterType, target: EnemyType | CharacterType, spell: string, spellCost: number) => {

    setTimeout(() => {
        storeAtom.set(AttackAnimationAtom, (prev) => ({ ...prev, [character.id]: false }));
        storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, [enemy.id]: false }));
    }, 2700);

    storeAtom.set(AttackAnimationAtom, (prev) => ({ ...prev, [character.id]: true }));
    storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, [enemy.id]: true }));

    setTimeout(() => {
    }, 2700);

    if (attacks[spell]) {
        return attacks[spell](enemy, character, enemy, spellCost);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
    }

};