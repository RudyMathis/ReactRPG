import { atom } from 'jotai';
import { EnemyType } from './BaseEnemyAtom';
import { storeAtom } from './storeAtom';
import EnemyAtom from './BaseEnemyAtom';
import { turnCountAtom } from './UseTurnCountAtom';
import { getRandomEnemyType, getRandomElement, getRandomClass, determineEnemyGroup } from './BaseEnemyAtom';
import EnemyFactory from '../gameData/enemies/EnemyFactory';
import { generateNewBackground } from './BackgroundAtom'; 
import { getEnemyCount } from '../gameData/enemies/EnemyCount';

type GameLevelType = {
    round: number;
    level: number;
    isRoundOver: boolean;
    isLevelOver: boolean;
    background: string;
    isGameOver: boolean;
    isHideBegin: boolean;
}

const getInitialGameLevel = (): GameLevelType => {
    const savedLevel = localStorage.getItem('Level');
    const savedRound = localStorage.getItem('Round');
    const savedBackground = localStorage.getItem('background');

    if (savedLevel && savedRound) {
        return {
            round: parseInt(savedRound, 10),
            level: parseInt(savedLevel, 10),
            isRoundOver: false,
            isLevelOver: false,
            isHideBegin: false,
            background: savedBackground || generateNewBackground(),
            isGameOver: false
        };
    }

    return {
        round: 1,
        level: 1,
        isRoundOver: false,
        isLevelOver: false,
        isHideBegin: false,
        background: savedBackground || generateNewBackground(),
        isGameOver: false
    };
};

export const GameLevelAtom = atom<GameLevelType>(getInitialGameLevel());

const generateNewEnemies = (round: number, level: number): Record<number, EnemyType> => {
    const newEnemies: Record<number, EnemyType> = {};

    // Prevent values < 1
    const levelMultiplier = Math.max(1, level * 0.5);
    const roundMultiplier = Math.max(1, round * 0.5);
    const scale = levelMultiplier * roundMultiplier;
    const enemyCount = getEnemyCount();


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

        // Clone base stats before scaling
        const base = structuredClone(enemy);

        enemy.id = i + 100;
        enemy.group = enemyGroup;
        enemy.name = finalName;

        enemy.health = Math.round(Math.max(base.health, base.health * scale));
        enemy.maxHealth = Math.round(Math.max(base.maxHealth, base.maxHealth * scale));
        enemy.mana = Math.round(Math.max(base.mana, base.mana * scale));
        enemy.maxMana = Math.round(Math.max(base.maxMana, base.maxMana * scale));
        enemy.defense = Math.round(Math.max(base.defense, base.defense * scale));
        enemy.defenseDefault = Math.round(Math.max(base.defenseDefault, base.defenseDefault * scale));
        enemy.speed = Math.round(Math.max(base.speed, base.speed * scale));
        enemy.speedDefault = Math.round(Math.max(base.speedDefault, base.speedDefault * scale));
        enemy.attack = Math.round(Math.max(base.attack, base.attack * scale));

        enemy.level = level;
        enemy.order = i + 1;

        newEnemies[enemy.id] = enemy;
    }

    return newEnemies;
};

export const startNewRound = () => {
    storeAtom.set(GameLevelAtom, (prev) => {
        let newRound = prev.round + 1;
        let newLevel = prev.level;
    
        if (newRound > 3) {
            newRound = 1;
            newLevel++;
        }
    
        const newBackground = generateNewBackground();
    
        localStorage.setItem('Level', JSON.stringify(newLevel));
        localStorage.setItem('Round', JSON.stringify(newRound));
        localStorage.setItem('background', newBackground);
    
        return {
            ...prev,
            round: newRound,
            level: newLevel,
            isRoundOver: false,
            isLevelOver: false,
            isHideBegin: false,
            background: newBackground,
        };
    });
    

    // Update enemies and turn count as before
    const { level, round } = storeAtom.get(GameLevelAtom);
    const newEnemies = generateNewEnemies(round, level);
    storeAtom.set(EnemyAtom, newEnemies);
    localStorage.setItem('enemies', JSON.stringify(newEnemies));
    storeAtom.set(turnCountAtom, 1);
    localStorage.setItem('turnCount', '1');
};