import { atom } from 'jotai';
import { EnemyType } from './BaseEnemyAtom';
import { storeAtom } from './storeAtom';
import EnemyAtom from './BaseEnemyAtom';
import { turnCountAtom } from './UseTurnCountAtom';
import { getRandomEnemyType, getRandomElement, getRandomClass, determineEnemyGroup } from './BaseEnemyAtom';
import EnemyFactory from '../gameData/EnemyFactory';

// Function to get initial GameLevelAtom state from localStorage
const getInitialGameLevel = () => {
    const savedLevel = localStorage.getItem('Level');
    const savedRound = localStorage.getItem('Round');

    if (savedLevel && savedRound) {
        return {
            round: parseInt(savedRound, 10),
            level: parseInt(savedLevel, 10),
            isRoundOver: false,
            isLevelOver: false,
        };
    }

    return {
        round: 1,
        level: 1,
        isRoundOver: false,
        isLevelOver: false,
    };
};

export const GameLevelAtom = atom(getInitialGameLevel());

const generateNewEnemies = (round: number, level: number): Record<number, EnemyType> => {
    const newEnemies: Record<number, EnemyType> = {};
    const enemyCount = Math.floor(Math.random() * 1) + 2;

    for (let i = 0; i < enemyCount; i++) {
        const enemyType = getRandomEnemyType();
        const enemyGroup = determineEnemyGroup(enemyType);
        const element = getRandomElement();
        const enemyClass = getRandomClass(enemyGroup);

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

        const enemy = EnemyFactory.createEnemy(enemyType, [element, enemyClass]);
        enemy.id = i + 100;
        enemy.group = enemyGroup;
        enemy.name = finalName;

        enemy.health = enemy.health + round * 10 * level;
        enemy.maxHealth = enemy.maxHealth + round * 10 * level;
        enemy.attack = enemy.attack + round * 2 * level;
        enemy.level = level;
        enemy.order = i + 1;

        newEnemies[enemy.id] = enemy;
    }

    return newEnemies;
};

export const startNewRound = () => {
    storeAtom.set(GameLevelAtom, prev => {
        const newRound = prev.round + 1;
        let newLevel = prev.level;

        if (newRound > 3) {
            newLevel++;
            return { ...prev, round: 1, isRoundOver: false, level: newLevel };
        }

        return { ...prev, round: newRound, isRoundOver: false };
    });

    const { level, round } = storeAtom.get(GameLevelAtom);

    localStorage.setItem('Level', JSON.stringify(level));
    localStorage.setItem('Round', JSON.stringify(round));

    // Clear existing enemies from local storage and generate new ones
    localStorage.removeItem('enemies');
    const newEnemies = generateNewEnemies(round, level);
    storeAtom.set(EnemyAtom, newEnemies);
    localStorage.setItem('enemies', JSON.stringify(newEnemies));

    storeAtom.set(turnCountAtom, 1);
    localStorage.setItem('turnCount', '1');
    console.log("Round:", round, "Level:", level);
};