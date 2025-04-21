import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";
import { AttackAnimationAtom } from "../../atom/effects/AttackAnimationAtom";
import { storeAtom } from "../../atom/storeAtom";
import attacks from "./attacks/Attacks";

export const EnemyAttack = (
    character: CharacterType,
    enemy: EnemyType,
    target: CharacterType
) => {
    if (enemy.spells && enemy.spells.length > 0) {
        const usableSpells = enemy.spells.filter(spell => {
            const match = spell.match(/\$(-?\d+)$/);
            const cost = match ? parseInt(match[1], 10) : 0;
            return enemy.mana >= cost;
        });

        if (usableSpells.length > 0) {
            const chosenSpell = usableSpells[Math.floor(Math.random() * usableSpells.length)];
            const match = chosenSpell.match(/\$(-?\d+)$/);
            const spellCost = match ? parseInt(match[1], 10) : 0;
            const spellAnimation = attacks[chosenSpell]?.animation ?? null;

            console.log(`Enemy ${enemy.name} is using spell: ${chosenSpell} with cost ${spellCost}`);

            // Start animation
            storeAtom.set(AttackAnimationAtom, prev => ({
                ...prev,
                [enemy.id]: true,
            }));
            storeAtom.set(FlashAnimationAtom, prev => ({
                ...prev,
                [character.id]: spellAnimation,
            }));

            // Stop animation after duration
            setTimeout(() => {
                storeAtom.set(AttackAnimationAtom, prev => ({
                    ...prev,
                    [enemy.id]: false,
                }));
                storeAtom.set(FlashAnimationAtom, prev => ({
                    ...prev,
                    [character.id]: null,
                }));
            }, 900); // match your animation duration

            // Execute attack logic
            if (typeof attacks[chosenSpell]?.func === 'function') {
                return attacks[chosenSpell].func(enemy, character, target, spellCost);
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
