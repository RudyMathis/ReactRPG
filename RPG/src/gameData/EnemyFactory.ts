import { EnemyType } from "../atom/BaseEnemyAtom";
import BaseEnemyData from "../gameData/enemies/BaseEnemyData.json";
import Resistances from "../gameData/Resistances";
import Vulnerabilites from "./Vulnerabilities";

type BaseEnemyDataRecord = Record<string, EnemyType>;

const baseEnemyDataRecord: BaseEnemyDataRecord = BaseEnemyData;

class EnemyFactory {
    static createEnemy(baseName: string, modifier?: string): EnemyType {
        const baseEnemy = baseEnemyDataRecord[baseName];

        if (!baseEnemy) {
            throw new Error(`Enemy ${baseName} not found in EnemyData`);
        }

        // Default modified enemy
        let modifiedEnemy: EnemyType = { ...baseEnemy };

        // Apply modifier effects
        if (modifier) {
            modifiedEnemy = {
                ...modifiedEnemy,
                name: `${modifier} ${baseEnemy.name}`,
                health: baseEnemy.health + (modifier === "Ice" ? 30 : modifier === "Fire" ? 20 : 10),
                maxHealth: baseEnemy.maxHealth + (modifier === "Ice" ? 30 : modifier === "Fire" ? 20 : 10),
                attack: baseEnemy.attack + (modifier === "Ice" ? 5 : modifier === "Fire" ? 8 : 3),
                defense: baseEnemy.defense + (modifier === "Dark" ? 5 : 0),
                speed: baseEnemy.speed + (modifier === "Fire" ? 3 : 0),
                spells: [
                    ...baseEnemy.spells,
                    ...(modifier === "Ice" ? ["Frostbite"] : []),
                    ...(modifier === "Fire" ? ["Flame Burst"] : []),
                    ...(modifier === "Dark" ? ["Shadow Strike"] : []),
                ],
                resistances: [
                    ...baseEnemy.resistances,
                    ...(modifier in Resistances ? [Resistances[modifier as keyof typeof Resistances]] : []),
                ],
                vulnerabilities: [
                    ...baseEnemy.vulnerabilities,
                    ...(modifier in Vulnerabilites ? [Vulnerabilites[modifier as keyof typeof Vulnerabilites]] : []),
                ],
                type: modifier, // Set element type
            };
        }

        return modifiedEnemy;
    }
}

export default EnemyFactory;
