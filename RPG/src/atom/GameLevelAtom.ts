import { atom } from 'jotai';
import { EnemyType } from './BaseEnemyAtom';
import { storeAtom } from './storeAtom';
import EnemyAtom from './BaseEnemyAtom';
import { turnCountAtom } from './UseTurnCountAtom';
import { getRandomEnemyType, getRandomElement, getRandomClass, determineEnemyGroup } from './BaseEnemyAtom';
import EnemyFactory from '../gameData/EnemyFactory';

export const GameLevelAtom = atom({
    round: 1,
    level: 1,
    isRoundOver: false,
    isLevelOver: false,
});

const generateNewEnemies = (round: number): Record<number, EnemyType> => {
    const newEnemies: Record<number, EnemyType> = {};
    const enemyCount = Math.floor(Math.random() * 4) + 4; // Random between 4-7

    for (let i = 0; i < enemyCount; i++) {
        // Pick a random enemy type from your predefined groups
        const enemyType = getRandomEnemyType();
        const enemyGroup = determineEnemyGroup(enemyType);
        const element = getRandomElement();
        const enemyClass = getRandomClass(enemyGroup);

        // Build the enemy's display name using your naming conventions
        const finalElement = element ? `${element}` : "";
        const finalClass = enemyClass ? `${enemyClass}` : "";
        let finalName = enemyType;

        if (enemyGroup === "humanoide") {
            finalName = `${finalElement} ${enemyType} ${finalClass}`.trim();
        } else if (enemyGroup === "beast") {
            finalName = `${finalClass} ${finalElement} ${enemyType}`.trim();
        } else if (enemyGroup === "elemental") {
            finalName = `${finalElement} ${enemyType} ${finalClass}`.trim();
        }

        // Use EnemyFactory to create the enemy from the template
        const enemy = EnemyFactory.createEnemy(enemyType, [element, enemyClass]);
        enemy.id = i + 100; // assign a new unique id
        enemy.group = enemyGroup;
        enemy.name = finalName;

        // Scale enemy stats for the new round
        enemy.health = enemy.health + round * 10;
        enemy.maxHealth = enemy.maxHealth + round * 10;
        enemy.attack = enemy.attack + round * 2;
        enemy.order = i + 1;

        newEnemies[enemy.id] = enemy;
    }
    
    return newEnemies;
};

export const startNewRound = () => {
  // Increment the round and reset the round-over flag
    storeAtom.set(GameLevelAtom, prev => {
        const newRound = prev.round + 1;
        return {
        ...prev,
        round: newRound,
        isRoundOver: false,
        };
    });

    // Use the updated round value for generating enemies
    const updatedRound = storeAtom.get(GameLevelAtom).round;
    const newEnemies = generateNewEnemies(updatedRound);
    storeAtom.set(EnemyAtom, newEnemies);

    // Reset turn counter
    storeAtom.set(turnCountAtom, 1);
};