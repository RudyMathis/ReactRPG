import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";

const spellCost = 60;
const damageMulitplier = .9;
const BurningSpritsTar60 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType
) => {
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    const spellAnimation = 'burning';

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const flashUpdate: Record<number, string | null> = {};

        selectedCharacters.forEach(targetChar => {
            flashUpdate[targetChar.id] = spellAnimation;

            targetChar.debuffs.push({
                type: Debuffs.Burn.type, 
                duration: 3,
                damage: 5,
                name: Debuffs.Burn.name,
                icon: Debuffs.Burn.icon
            });
            let damage = Math.round(character.attack * damageMulitplier);
            const fireResistance = targetChar.resistances.find(res => res.type ===  Resistances.Fire.type);
            const fireVulnerability = targetChar.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.name);
            const damageResistance = Math.max(5, Math.round(damage - Resistances.Fire.value))
            const damageVulnerability = Math.round(damage + Vulnerabilites.Fire.value)

            if (fireResistance) {
                damage = damageResistance;
            } else if (fireVulnerability) {
                damage = damageVulnerability;
            }

            targetChar.health -= damage;
            HandleDamageEffect(damage, "Fire", "player", targetChar.id);
        });

        storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
        setTimeout(() => {
            storeAtom.set(FlashAnimationAtom, (prev) => {
                const next = { ...prev };
                selectedCharacters.forEach(char => {
                    next[char.id] = null;
                });
                return next;
            });
        }, 900);

        return character.health;
    } else {
        character.mana -= spellCost;
        const enemies = Object.values(storeAtom.get(EnemyAtom));
        const flashUpdate: Record<number, string | null> = {};

        enemies.forEach(targetEnemy => {
            flashUpdate[targetEnemy.id] = spellAnimation;

            targetEnemy.debuffs.push({
                type: Debuffs.Burn.type, duration: 2,
                name: Debuffs.Burn.name,
                icon: Debuffs.Burn.icon
            });

            let damage = Math.round(character.attack * damageMulitplier);
            const fireResistance = targetEnemy.resistances.find(res => res.type ===  Resistances.Fire.type);
            const fireVulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.name);
            const damageResistance = Math.max(5, Math.round(damage - Resistances.Fire.value))
            const damageVulnerability = Math.round(damage + Vulnerabilites.Fire.value)

            if (fireResistance) {
                damage = damageResistance;
            } else if (fireVulnerability) {
                damage = damageVulnerability;
            }

            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Fire", "npc", targetEnemy.id);
        });

        storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
        setTimeout(() => {
            storeAtom.set(FlashAnimationAtom, (prev) => {
                const next = { ...prev };
                enemies.forEach(enemy => {
                    next[enemy.id] = null;
                });
                return next;
            });
        }, 900);

        return enemy.health;
    }
};

export { spellCost, damageMulitplier };
export default BurningSpritsTar60;