import { atom } from 'jotai';
import EnemyFactory from '../gameData/enemies/EnemyFactory';
import { enemyCount } from '../gameData/enemies/EnemyCount';

type Resistance = {
    type: string;
    value: number;
}

type Vulnerability = {
    type: string;
    value: number;
}

type BuffEffect = {
    name: string;
    type: string;
    duration: number;
    damage?: number;
    attack?: number;
    defense?: number;
    health?: number;
    icon?: string;
};

type DebuffEffect = {
    name: string;
    type: string;
    duration: number;
    damage?: number;
    icon?: string
};

export type EnemyType = {
    id: number;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    attackDefault: number;
    defense: number;
    defenseDefault: number;
    resistances: Resistance[];
    vulnerabilities: Vulnerability[];
    speed: number;
    speedDefault: number;
    mana: number;
    maxMana: number;
    order: number;
    spells: string[];
    target: string[];
    weapon: string;
    buffs: BuffEffect[];
    debuffs: DebuffEffect[];
    isSelected: boolean;
    type: string;
    hasScored: boolean;
    resource_type: string;
    base: string;
    size: string;
    group: string;
};

// Predefined enemy groups
const enemyGroups: Record<string, string> = {
    "Death_Knight": "elemental",
    "Ent": "elemental",
    "Ettin": "humanoide",
    "Ghoul": "humanoide",
    "Goblin": "humanoide",
    "Manticore": "humanoide",
    "Rat": "beast",
    "Skeleton": "humanoide",
    "Zombie": "humanoide",
};

// Function to determine enemy group
export const determineEnemyGroup = (enemyType: string): string => {
    return enemyGroups[enemyType] || "unknown";
};

// Function to get a random element type
export const getRandomElement = (): string => {
    const elements = ["Fire", "Ice", "Dark", ""];
    return elements[Math.floor(Math.random() * elements.length)];
};

// Function to get a random class based on enemy group
export const getRandomClass = (group: string): string => {
    if (group === "humanoide") {
        const classes = ["Knight", "Warlock", "Assassin", "Paladin", ""];
        return classes[Math.floor(Math.random() * classes.length)];
    } 
    if (group === "beast") {
        const classes = ["King", "Alpha", "Rabid", ""];
        return classes[Math.floor(Math.random() * classes.length)];
    } 
    if (group === "elemental") {
        const classes = ["Ancient", ""];
        return classes[Math.floor(Math.random() * classes.length)];
    }
    return ""; 
};

// Function to get a random enemy type
export const getRandomEnemyType = (): string => {
    const enemyTypes = Object.keys(enemyGroups);
    return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
};

// Generate up to 7 unique enemies
const initialEnemies: Record<number, EnemyType> = {};

for (let i = 0; i < enemyCount; i++) {
    const enemyType = getRandomEnemyType();
    const enemyGroup = determineEnemyGroup(enemyType);
    
    const element = getRandomElement();
    const enemyClass = getRandomClass(enemyGroup);

    // Ensure no duplication in element naming
    const finalElement = element ? `${element}` : "";
    const finalClass = enemyClass ? `${enemyClass}` : "";

    let finalName = enemyType; // Default to just the name

    // Apply naming format based on group
    if (enemyGroup === "humanoide") {
        finalName = `${finalElement} ${enemyType} ${finalClass}`.trim();
    } else if (enemyGroup === "beast") {
        finalName = `${finalClass} ${finalElement} ${enemyType}`.trim();
    } else if (enemyGroup === "elemental") {
        finalName = `${finalElement} ${enemyType} ${finalClass}`.trim();
    }

    // Create enemy
    const enemy = EnemyFactory.createEnemy(enemyType, [element, enemyClass]);
    enemy.id = i + 100;
    enemy.group = enemyGroup;
    enemy.name = finalName;

    initialEnemies[enemy.id] = enemy;
}

console.log("Initialized Enemies:", initialEnemies);

const EnemyAtom = atom(initialEnemies);
export default EnemyAtom;
