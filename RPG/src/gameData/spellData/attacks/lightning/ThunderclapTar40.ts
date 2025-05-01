import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfHolyDamageBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom"; 

const ThunderclapTar40 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 40;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    const spellAnimation = 'lightning';

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const flashUpdate: Record<number, string | null> = {};
        
        selectedCharacters.forEach(targetChar => {
            flashUpdate[targetChar.id] = spellAnimation;
            const resistance = targetChar.resistances.find(res => res.type === "Lightning")?.value || 0;
            const vulnerability = targetChar.vulnerabilities.find(vul => vul.type === "Lightning")?.value || 0;

            let damage = Math.round(enemy.attack * 0.9);

            if (resistance > 0) {
                damage = Math.max(5, Math.round(enemy.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(enemy.attack + vulnerability);
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
            const resistance = targetEnemy.resistances.find(res => res.type === "Lightning")?.value || 0;
            const vulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === "Lightning")?.value || 0;

            let damage = Math.round(character.attack * 0.9);

            if (resistance > 0) {
                damage = Math.max(5, Math.round(character.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(character.attack + vulnerability);
            }

            HandleDamageEffect(damage, "Lightning", "npc", targetEnemy.id);
            BlessingOfBurnBonus(character, targetEnemy);
            BlessingOfHolyDamageBonus(character, targetEnemy);
            targetEnemy.health -= damage;
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

export default ThunderclapTar40;