import { atom } from 'jotai';
import EnemyFactory from '../gameData/EnemyFactory';

type Resistance = {
    type: string;
    value: number;
}

type vulnerability = {
    type: string;
    value: number;
}
type BuffEffect = {
    type: string;
    duration: number;
    damage?: number;
};
type DebuffEffect = {
    type: string;
    duration: number;
    damage?: number;
};

export type EnemyType = {
    id: number;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    resistances: Resistance[];
    vulnerabilities: vulnerability[];
    speed: number;
    speedDefault: number;
    mana: number;
    maxMana: number;
    order: number;
    spells: string[];
    target: string[];
    buff: BuffEffect[];
    debuff: DebuffEffect[];
    isSelected: boolean;
    type: string;
};

// Function to get a random element type
const getRandomElement = () => {
    const elements = ["Fire", "Ice", "Dark"];
    return elements[Math.floor(Math.random() * elements.length)];
};

// Function to get a random enemy type
const getRandomEnemyType = () => {
    const enemyTypes = ["Skeleton", "Ghoul", "Zombie", "Rat", "Wolf", "Goblin", "Ent"];
    return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
};

// Generate up to 7 unique enemies
const initialEnemies: Record<number, EnemyType> = {};
// const enemyCount = Math.floor(Math.random() * 7) + 1; // Between 1 and 7 enemies
// random enemy count between 4 and 7
const enemyCount = Math.floor(Math.random() * 4) + 4;

for (let i = 0; i < enemyCount; i++) {
    const element = getRandomElement();
    const enemyType = getRandomEnemyType();
    
    // Ensure unique IDs by using the loop index
    const enemy = EnemyFactory.createEnemy(enemyType, element);
    enemy.id = i + 100; // Assign a unique ID (1-based index)
    
    initialEnemies[enemy.id] = enemy;
}

console.log("Initialized Enemies:", initialEnemies); // Debugging

const EnemyAtom = atom(initialEnemies);

export default EnemyAtom;
