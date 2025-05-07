import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../atom/effects/FlashAnimationAtom";
import { AttackAnimationAtom } from "../../atom/effects/AttackAnimationAtom";
import { storeAtom } from "../../atom/storeAtom";
import attacks from "./attacks/Attacks";
import { actionsTextAtom } from "../../atom/ActionsTextAtom";

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
            const spellCost = attacks[chosenSpell].cost ?? 0;
            const spellAnimation = attacks[chosenSpell]?.animation ?? null;
            const spellName = attacks[chosenSpell].name;

            storeAtom.set(AttackAnimationAtom, prev => ({
                ...prev,
                [enemy.id]: true,
            }));
            storeAtom.set(FlashAnimationAtom, prev => ({
                ...prev,
                [character.id]: spellAnimation?.name ?? null,
                duration: spellAnimation?.duration,
                width: spellAnimation?.width,
                height: spellAnimation?.height,
                steps: spellAnimation?.steps,
                image: spellAnimation?.image,
            }));

            setTimeout(() => {
                storeAtom.set(AttackAnimationAtom, prev => ({
                    ...prev,
                    [enemy.id]: false,
                }));
                storeAtom.set(FlashAnimationAtom, prev => ({
                    ...prev,
                    [character.id]: null,
                }));
            }, 900);

            // Execute attack logic
            if (typeof attacks[chosenSpell]?.func === 'function') {
                storeAtom.set(actionsTextAtom, {
                    entity: enemy,
                    action: `${spellName}`,
                    value: `${enemy.attack}`,
                    target: target,
                    isAttack: true,
                    isDefense: false,
                    isAoe: attacks[chosenSpell].aoe,
                });
                return attacks[chosenSpell].func(enemy, character, target, spellCost);
            } else {
                console.warn(`Spell effect for '${spellName}' not found in attacks.`);
            }
        } else {
            console.warn(`Enemy ${enemy.name} has no usable spells with ${enemy.mana} mana.`);
        }
    } else {
        console.warn(`Enemy ${enemy.name} has no spells defined.`);
    }

    // Fallback: basic attack
    storeAtom.set(actionsTextAtom, { 
        entity: enemy,
        action: `Attack`,
        value: `${enemy.attack}`,
        target: target,
        isAttack: true,
        isDefense: false,
        isAoe: false,
    });

    return character.health - Math.max(5, enemy.attack - character.defense);
};