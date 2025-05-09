import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { FlashAnimationAtom } from "../../../../atom/effects/FlashAnimationAtom";

const CleaveTar30 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 30;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    const spellAnimation = 'cleave';

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

        const damage = Math.max(10, Math.round(enemy.attack) - character.defense);
        const nextCharacter = characterIndex < sortedCharacters.length - 1 ? sortedCharacters[characterIndex + 1] : null;

        if (nextCharacter) {
            flashUpdate[nextCharacter.id] = spellAnimation;
            nextCharacter.health -= damage;
            HandleDamageEffect(damage, "Physical", "player", nextCharacter.id);
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
        }

        HandleDamageEffect(damage, "Physical", "player", character.id);
        flashUpdate[character.id] = spellAnimation;

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

        const damage = Math.max(10, Math.round(character.attack - enemy.defense));
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        if (nextEnemy) {
            flashUpdate[nextEnemy.id] = spellAnimation;
            HandleDamageEffect(damage, "Physical", "npc", nextEnemy.id);
            BlessingOfBurnBonus(character, nextEnemy);
            BlessingOfLightningBonus(character, nextEnemy);
            nextEnemy.health -= damage;
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
        }

        HandleDamageEffect(damage, "Physical", "npc", enemy.id);
        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
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

export default CleaveTar30;