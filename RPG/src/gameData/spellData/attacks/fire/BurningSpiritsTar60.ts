import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";

const BurningSpritsTar60 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 60;
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
            const resistance = targetChar.resistances.find(res => res.type === "Fire")?.value || 0;
            const vulnerability = targetChar.vulnerabilities.find(vul => vul.type === "Fire")?.value || 0;

            let damage = Math.round(enemy.attack * .9);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(enemy.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(enemy.attack + vulnerability);
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
            const resistance = targetEnemy.resistances.find(res => res.type === "Fire")?.value || 0;
            const vulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === "Fire")?.value || 0;

            let damage = Math.round(character.attack * .9);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(character.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(character.attack + vulnerability);
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

export default BurningSpritsTar60;