import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom"; 
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";

const spellCost = 40;
const damageMulitplier = .9;
const ThunderclapTar40 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType
) => {
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    const spellAnimation = 'lightning';

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const flashUpdate: Record<number, string | null> = {};
        
        selectedCharacters.forEach(targetChar => {
            flashUpdate[targetChar.id] = spellAnimation;
            let damage = Math.round(character.attack * damageMulitplier);
            const lightningResistance = targetChar.resistances.find(res => res.type ===  Resistances.Lightning.type);
            const lightningVulnerability = targetChar.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.name);
            const damageResistance = Math.max(5, Math.round(damage - Resistances.Lightning.value))
            const damageVulnerability = Math.round(damage + Vulnerabilites.Lightning.value)

            if (lightningResistance) {
                damage = damageResistance;
            } else if (lightningVulnerability) {
                damage = damageVulnerability;
            }

            targetChar.health -= damage;
            HandleDamageEffect(damage, "Lightning", "player", targetChar.id);
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
            let damage = Math.round(character.attack * damageMulitplier);
            const lightningResistance = targetEnemy.resistances.find(res => res.type ===  Resistances.Lightning.type);
            const lightningVulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.name);
            const damageResistance = Math.max(5, Math.round(damage - Resistances.Lightning.value))
            const damageVulnerability = Math.round(damage + Vulnerabilites.Lightning.value)

            if (lightningResistance) {
                damage = damageResistance;
            } else if (lightningVulnerability) {
                damage = damageVulnerability;
            }

            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Lightning", "npc", targetEnemy.id);
            BlessingOfBurnBonus(character, targetEnemy);
            BlessingOfLightningBonus(character, targetEnemy);
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
export default ThunderclapTar40;