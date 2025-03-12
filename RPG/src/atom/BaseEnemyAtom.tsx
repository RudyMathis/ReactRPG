import { atom } from 'jotai';
import BaseEnemyData from "../routes/enemies/BaseEnemyData.json";

export type EnemyType = {
    id: number;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    speed: number;
    mana: number;
    maxMana: number;
    luck: number;
    items: string[];
    spells: string[];
    target: string[];
    selected: boolean;
}

const EnemyAtom = atom<Record<number, EnemyType>>(
    Object.values(BaseEnemyData).reduce((acc, enemy) => {
        acc[enemy.id] = enemy;
        return acc;
    }, {} as Record<number, EnemyType>)
);

export default EnemyAtom