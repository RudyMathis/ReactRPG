import EnemyAtom from "../atom/BaseEnemyAtom";
import { ScoreAtom } from "../atom/persistant/ScoreAtom";
import { storeAtom } from "../atom/storeAtom";
import { CalculateTurnScore } from "./CalculateTurnScore";


export const ScorePoints = () => {
    const enemies = storeAtom.get(EnemyAtom);
    const deadEnemies: number[] = [];
    
    Object.values(enemies).forEach((enemy) => {
        if (enemy.health <= 0 && !enemy.hasScored) {
            deadEnemies.push(enemy.id);
    
            // Award points
            const killedEnemyLevel = enemy.level;
            CalculateTurnScore(killedEnemyLevel);
            
            // Mark as scored
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [enemy.id]: {
                        ...prev[enemy.id],
                        hasScored: true,
                    },
                }));
                console.log('killed enemy level', killedEnemyLevel, "enemy", enemy);
            }
    });
    
    if (deadEnemies.length > 0) {
        localStorage.setItem('Score', JSON.stringify(storeAtom.get(ScoreAtom)));
    }
};