import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";
import { BaseDamageFlashAtom } from "../atom/effects/BaseDamageFlashAtom";
import { ShakeAtom } from "../atom/effects/ShakeAtom";
import { storeAtom } from "../atom/storeAtom";

const spellEffects: Record<string, (enemy: EnemyType, character: CharacterType) => number> = {
    Fire_Ball_Tar: (enemy, character) => enemy.health - (character.attack + 10),
    Ice_Bolt_Tar: (enemy, character) => {
        enemy.status.push({ type: "Frozen", duration: 3 });
        enemy.speed = 0;
        return enemy.health - (character.attack + 5);
    },
    Lightning_Bolt_Tar: (enemy, character) => enemy.health - (character.attack + 15),
    Garrote_Tar: (enemy, character) => {
        enemy.status.push({ type: "Bleed", duration: 3, damage: 10 });
        return enemy.health - (character.attack + 5);
    },

    Multi_Shot_Tar: (enemy: EnemyType, character: CharacterType) => {
        const enemies = Object.values(storeAtom.get(EnemyAtom)); // Get all enemies as an array
        const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order); // Ensure correct order

        const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
        
        if (enemyIndex === -1) {
            console.warn(`Enemy ${enemy.id} not found in sorted list.`);
            return enemy.health - (character.attack + 5);
        }

        // Get previous and next enemies if they exist
        const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        enemy.health -= character.attack + 5;

        if (prevEnemy) {
            prevEnemy.health -= character.attack + 5;
        }

        if (nextEnemy) {
            nextEnemy.health -= character.attack + 5;
        }

        return enemy.health; // Return updated health of main target
    }
};

const spellEffectsBuff: Record<string, (character: CharacterType) => number> = {
    Heal__Char: (character) => {
        const heal = character.health + 20;

        if(heal >= character.maxHealth) {
        return character.health = character.maxHealth
        } else {

        return heal;
        }
    },
};

const basicCharacterAttack = (enemy: EnemyType, character: CharacterType, spell: string) => {
    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [character.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [enemy.id]: true }));

    if (spellEffects[spell]) {
        return spellEffects[spell](enemy, character);
    } else {
        console.warn(`Unknown spell: ${spell}`);
        return enemy.health - character.attack; // Default attack
    }

};

const basicCharacterBuff = (character: CharacterType, spell: string) => {
    if (!spellEffectsBuff[spell]) {
        console.warn(`Unknown or missing spell in spellEffectsBuff: "${spell}"`);
        return character.health; // Return unchanged health if spell is not found
    }
    return spellEffectsBuff[spell](character);
};

const basicEnemyAttack = (character: CharacterType, enemy: EnemyType) => {
    setTimeout(() => {
        storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: false }));
        storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: false }));
    }, 300);

    storeAtom.set(ShakeAtom, (prev) => ({ ...prev, [enemy.id]: true }));
    storeAtom.set(BaseDamageFlashAtom, (prev) => ({ ...prev, [character.id]: true }));

    return character.health - enemy.attack;
};

export { basicCharacterAttack, basicCharacterBuff, basicEnemyAttack };