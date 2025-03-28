import { EnemyType } from "../atom/BaseEnemyAtom";
import BaseEnemyData from "../gameData/enemies/BaseEnemyData.json";
import Resistances from "../gameData/Resistances";
import Vulnerabilites from "./Vulnerabilities";

type BaseEnemyDataRecord = Record<string, EnemyType>;

const baseEnemyDataRecord: BaseEnemyDataRecord = BaseEnemyData;

const modifierEffects: Record<string, Partial<EnemyType>> = {
    "Ice": {
        health: 30,
        maxHealth: 30,
        attack: 5,
        spells: ["Frostbite"],
        resistances: [Resistances["Ice"]],
        vulnerabilities: [Vulnerabilites["Fire"]],
    },
    "Fire": {
        health: 20,
        maxHealth: 20,
        attack: 8,
        speed: 3,
        spells: ["Flame Burst"],
        resistances: [Resistances["Fire"]],
        vulnerabilities: [Vulnerabilites["Ice"]],
    },
    "Dark": {
        defense: 5,
        spells: ["Shadow Strike"],
        resistances: [Resistances["Dark"]],
        vulnerabilities: [Vulnerabilites["Light"]],
    },
    "Knight": {
        defense: 10,
        attack: 3,
        health: 15,
        maxHealth: 15,
    },
    "Rabid": {
        attack: 6,
        speed: 4,
        health: 10,
        maxHealth: 10,
    }
};

class EnemyFactory {
    static createEnemy(baseName: string, modifier?: string): EnemyType {
        const baseEnemy = baseEnemyDataRecord[baseName];

        if (!baseEnemy) {
            throw new Error(`Enemy ${baseName} not found in EnemyData`);
        }

        // Create unique copies to avoid shared references
        let modifiedEnemy: EnemyType = {
            ...baseEnemy,
            spells: [...baseEnemy.spells],
            resistances: [...baseEnemy.resistances],
            vulnerabilities: [...baseEnemy.vulnerabilities],
            buff: baseEnemy.buff ? baseEnemy.buff.map(b => ({ ...b })) : [],
            debuff: baseEnemy.debuff ? baseEnemy.debuff.map(d => ({ ...d })) : [],
            target: [...baseEnemy.target],
        };

        // Apply modifier effects if provided
        if (modifier && modifierEffects[modifier]) {
            const effects = modifierEffects[modifier];

            modifiedEnemy = {
                ...modifiedEnemy,
                name: `${modifier} ${baseEnemy.name}`,
                health: modifiedEnemy.health + (effects.health ?? 0),
                maxHealth: modifiedEnemy.maxHealth + (effects.maxHealth ?? 0),
                attack: modifiedEnemy.attack + (effects.attack ?? 0),
                defense: modifiedEnemy.defense + (effects.defense ?? 0),
                speed: modifiedEnemy.speed + (effects.speed ?? 0),
                spells: [...modifiedEnemy.spells, ...(effects.spells ?? [])],
                resistances: [...modifiedEnemy.resistances, ...(effects.resistances ?? [])],
                vulnerabilities: [...modifiedEnemy.vulnerabilities, ...(effects.vulnerabilities ?? [])]
            };
        }

        return modifiedEnemy;
    }
}

export default EnemyFactory;

