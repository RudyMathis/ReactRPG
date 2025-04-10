import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { BaseDamageFlashAtom } from "../../atom/effects/BaseDamageFlashAtom";
import { ShakeAtom } from "../../atom/effects/ShakeAtom";
import { storeAtom } from "../../atom/storeAtom";
import { AdditionalBlessingDamage } from "./AdditionalBlessingDamage";
import attacks from "./attacks/Attacks";

export const CharacterAttack = (enemy: EnemyType, character: CharacterType, spell: string, spellCost: number) => {

    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: true }));

    setTimeout(() => {
    }, 300);

    if (attacks[spell]) {
        return attacks[spell](enemy, character, enemy, spellCost);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
    }

};