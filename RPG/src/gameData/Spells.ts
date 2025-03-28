import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";
import { BaseDamageFlashAtom } from "../atom/effects/BaseDamageFlashAtom";
import { ShakeAtom } from "../atom/effects/ShakeAtom";
import { storeAtom } from "../atom/storeAtom";
import Resistances from "../gameData/Resistances";
import Vulnerabilites from "./Vulnerabilities";

const spellEffects: Record<string, (enemy: EnemyType, character: CharacterType) => number> = {
    Fire_Ball_Tar_20: (enemy, character) =>{ 
        enemy.debuff.push({ type: "Burn", duration: 3 });

        const spellCost = 20;
        character.mana -= spellCost;

        const fireResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Fire.type);
        const fireVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Fire.type);
        
        if (fireResistance) {
            return enemy.health - (character.attack - (fireResistance!.value));
        } else if (fireVulnerability) {
            return enemy.health - (character.attack + (fireVulnerability!.value));
        } else {
            return enemy.health - character.attack;
        }
    },
    Ice_Bolt_Tar_30: (enemy, character) => {
        enemy.debuff.push({ type: "Frozen", duration: 3 });
        enemy.speed = 0;
        const spellCost = 30;
        character.mana -= spellCost;

        const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
        
        if (iceResistance) {
            return enemy.health - (character.attack - (iceResistance!.value));
        } else if (iceVulnerability) {
            return enemy.health - (character.attack + (iceVulnerability!.value));
        } else {
            return enemy.health - character.attack;
        }
    },
    Lightning_Bolt_Tar: (enemy, character) => enemy.health - (character.attack + 15),
    Garrote_Tar: (enemy, character) => {
        enemy.debuff.push({ type: "Bleed", duration: 3, damage: (10 - (enemy.defense / 10)) });
        return enemy.health - (character.attack + (5 - (enemy.defense / 10)));
    },

    Multi_Shot_Tar_0: (enemy: EnemyType, character: CharacterType) => {
        const enemies = Object.values(storeAtom.get(EnemyAtom)); // Get all enemies as an array
        const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order); // Ensure correct order

        const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
        
        if (enemyIndex === -1) {
            console.warn(`Enemy ${enemy.id} not found in sorted list.`);
            return enemy.health - (character.attack - enemy.defense);
        }

        // Get previous and next enemies if they exist
        const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        enemy.health -= (character.attack - enemy.defense);

        if (prevEnemy) {
            prevEnemy.health -= (character.attack - enemy.defense);
        }

        if (nextEnemy) {
            nextEnemy.health -= (character.attack - enemy.defense);
        }

        return enemy.health; // Return updated health of main target
    }
};

const spellEffectsBuff: Record<string, (character: CharacterType, target: CharacterType) => number> = {
    Heal__Char_20: (character, target) => {
        const heal = target.health + 20;

        const spellCost = 20;
        character.mana -= spellCost;

        if(heal >= target.maxHealth) {
            return target.health = target.maxHealth
        } else {
            return heal;
        }
    },
    Cure__Char_10: (character, target) => {
        if(target.debuff.length > 0 && target.debuff[0].type !== "Dead") {
            target.debuff.length = 0
        } 

        const spellCost = 10;
        character.mana -= spellCost;

        return target.health
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

const basicCharacterBuff = (character: CharacterType, target: CharacterType, spell: string) => {
    if (!spellEffectsBuff[spell]) {
        console.warn(`Unknown or missing spell in spellEffectsBuff: "${spell}"`);
        return target.health; // Return unchanged health if spell is not found
    }
    return spellEffectsBuff[spell](character, target);
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