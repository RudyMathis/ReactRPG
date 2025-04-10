import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { BaseDamageFlashAtom } from "../../atom/effects/BaseDamageFlashAtom";
import { ShakeAtom } from "../../atom/effects/ShakeAtom";
import { storeAtom } from "../../atom/storeAtom";
import attacks from "./attacks/attacks";

export const EnemyAttack = (character: CharacterType, enemy: EnemyType, target: CharacterType) => {
    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: true }));

    setTimeout(() => {
    }, 1000);

    if (enemy.spells && enemy.spells.length > 0) {
        // Filter spells the enemy can afford
        const usableSpells = enemy.spells.filter(spell => {
            const match = spell.match(/\$(-?\d+)$/); // Extract cost from spell string
            const cost = match ? parseInt(match[1], 10) : 0;
            return enemy.mana >= cost;
        });

        if (usableSpells.length > 0) {
            const chosenSpell = usableSpells[Math.floor(Math.random() * usableSpells.length)];

            const match = chosenSpell.match(/\$(-?\d+)$/);
            const spellCost = match ? parseInt(match[1], 10) : 0;

            console.log(`Enemy ${enemy.name} is using spell: ${chosenSpell} with cost ${spellCost}`);

            if (typeof attacks[chosenSpell] === 'function') {
                return attacks[chosenSpell](enemy, character, target, spellCost);
            } else {
                console.warn(`Spell effect for '${chosenSpell}' not found in attacks.`);
            }
            
        } else {
            console.warn(`Enemy ${enemy.name} has no usable spells with ${enemy.mana} mana.`);
        }
    } else {
        console.warn(`Enemy ${enemy.name} has no spells defined.`);
    }

    // Fallback: basic attack
    return character.health - Math.max(1, enemy.attack - character.defense);
};