import { atom } from 'jotai';
import { EnemyType } from "../routes/enemies/EnemyType";
import BaseEnemyData from "../routes/enemies/BaseEnemyData.json";

const EnemyAtom = atom<Record<number, EnemyType>>(
    Object.values(BaseEnemyData).reduce((acc, enemy) => {
        acc[enemy.id] = enemy;
        return acc;
    }, {} as Record<number, EnemyType>)
);

export default EnemyAtom