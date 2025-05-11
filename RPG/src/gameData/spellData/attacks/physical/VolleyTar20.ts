import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom";

const spellCost = 20;
const damageMulitplier = 1;
const VolleyTar20 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType
) => {
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    const spellAnimation = 'shoot';

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const flashUpdate: Record<number, string | null> = {};

        selectedCharacters.forEach(targetChar => {
            const damage = Math.max(5, Math.round((enemy.attack * damageMulitplier) - targetChar.defense));
            targetChar.health -= damage;
            HandleDamageEffect(damage, "Physical", "player", targetChar.id);
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
            const damage = Math.max(5, Math.round((character.attack * damageMulitplier) - targetEnemy.defense));
            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Physical", "npc", targetEnemy.id);
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
export default VolleyTar20;