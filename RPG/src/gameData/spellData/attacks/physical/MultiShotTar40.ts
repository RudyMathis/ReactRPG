import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom";

const MultiShotTar$40 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 40;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type;
    const spellAnimation = 'multiShot';

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const sortedCharacters = [...selectedCharacters].sort((a, b) => a.id - b.id);
        const characterIndex = sortedCharacters.findIndex(e => e.id === character.id);
        const flashUpdate: Record<number, string | null> = {};

        if (characterIndex === -1) {
            console.warn(`character ${character.id} not found in sorted list.`);
            return character.health;
        }

        const damage = Math.max(5, Math.round(enemy.attack) - character.defense);

        const prevCharacter = characterIndex > 0 ? sortedCharacters[characterIndex - 1] : null;
        const nextCharacter = characterIndex < sortedCharacters.length - 1 ? sortedCharacters[characterIndex + 1] : null;

        if (prevCharacter) {
            HandleDamageEffect(damage, "Physical", "player", prevCharacter.id);
            
            flashUpdate[prevCharacter.id] = spellAnimation;
            storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
            setTimeout(() => {
                storeAtom.set(FlashAnimationAtom, (prev) => {
                    const previous = { ...prev };
                    selectedCharacters.forEach(prevCharacter => {
                        previous[prevCharacter.id] = null;
                    });
                    return previous;
                });
            }, 900);

            prevCharacter.health -= damage;
        }

        if (nextCharacter) {
            HandleDamageEffect(damage, "Physical", "player", nextCharacter.id);
            
            flashUpdate[nextCharacter.id] = spellAnimation;
            storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
            setTimeout(() => {
                storeAtom.set(FlashAnimationAtom, (prev) => {
                    const next = { ...prev };
                    selectedCharacters.forEach(nextCharacter => {
                        next[nextCharacter.id] = null;
                    });
                    return next;
                });
            }, 900);

            nextCharacter.health -= damage;
        }

        HandleDamageEffect(damage, "Physical", "player", character.id);

        flashUpdate[character.id] = spellAnimation;
        setTimeout(() => {
            storeAtom.set(FlashAnimationAtom, (prev) => {
                const next = { ...prev };
                selectedCharacters.forEach(char => {
                    next[char.id] = null;
                });
                return next;
            });
        }, 900);

        return character.health -= damage;
    } else {
        character.mana -= spellCost;

        const enemies = Object.values(storeAtom.get(EnemyAtom));
        const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order);
        const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
        const flashUpdate: Record<number, string | null> = {};

        if (enemyIndex === -1) {
            console.warn(`Enemy ${enemy.id} not found in sorted list.`);
            return enemy.health;
        }

        const damage = Math.max(5, Math.round(character.attack - enemy.defense));

        const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        if (prevEnemy) {
            
            BlessingOfBurnBonus(character, prevEnemy);
            BlessingOfLightningBonus(character, prevEnemy);
            HandleDamageEffect(damage, "Physical", "npc", prevEnemy.id);
            
            flashUpdate[prevEnemy.id] = spellAnimation;
            storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
            setTimeout(() => {
                storeAtom.set(FlashAnimationAtom, (prev) => {
                    const previous = { ...prev };
                    enemies.forEach(prevEnemy => {
                        previous[prevEnemy.id] = null;
                    });
                    return previous;
                });
            }, 900);

            prevEnemy.health -= damage;
        }

        if (nextEnemy) {
            
            BlessingOfBurnBonus(character, nextEnemy);
            BlessingOfLightningBonus(character, nextEnemy);
            HandleDamageEffect(damage, "Physical", "npc", nextEnemy.id);
            
            flashUpdate[nextEnemy.id] = spellAnimation;
            storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
            setTimeout(() => {
                storeAtom.set(FlashAnimationAtom, (prev) => {
                    const next = { ...prev };
                    enemies.forEach(nextEnemy => {
                        next[nextEnemy.id] = null;
                    });
                    return next;
                });
            }, 900);

            nextEnemy.health -= damage;
        }

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        HandleDamageEffect(damage, "Physical", "npc", enemy.id);

        flashUpdate[enemy.id] = spellAnimation;
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

        return enemy.health -= damage;
    }
};

export default MultiShotTar$40;