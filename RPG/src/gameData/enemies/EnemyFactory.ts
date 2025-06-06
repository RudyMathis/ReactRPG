import { determineEnemyGroup, EnemyType, getRandomClass, getRandomElement, getRandomEnemyType } from "../../atom/BaseEnemyAtom";
import BaseEnemyData from "./BaseEnemyData.json";
import Resistances from "../Resistances";
import Vulnerabilities from "../Vulnerabilities";

import { getEnemyCount } from "./EnemyCount";

type BaseEnemyDataRecord = Record<string, EnemyType>;

const baseEnemyDataRecord: BaseEnemyDataRecord = BaseEnemyData;

const elementEffects: Record<string, Partial<EnemyType>> = {
    "Ice": {
        attack: 5,
        attackDefault: 5,
        defense: 5,
        defenseDefault: 5,
        mana: 30,
        maxMana: 30,
        spells: ["Frostbite__Tar$20"],
        resistances: [Resistances.Ice],
        vulnerabilities: [Vulnerabilities.Ice],
    },
    "Fire": {
        health: 30,
        maxHealth: 30,
        attack: 15,
        attackDefault: 15,
        mana: 30,
        maxMana: 30,
        spells: ["Fire_Ball_Tar$20"],
        resistances: [Resistances.Fire],
        vulnerabilities: [Vulnerabilities.Fire],
    },
    "Dark": {
        health: 30,
        maxHealth: 30,
        attack: 5,
        attackDefault: 5,
        defense: 5,
        defenseDefault: 5,
        spells: ["Shadow_Strike_Tar$0"],
        resistances: [Resistances.Dark],
        vulnerabilities: [Vulnerabilities.Dark],
    }
};

const classEffects: Record<string, Partial<EnemyType>> = {
    // "Knight": {
    //     attack: 15,
    //     attackDefault: 15,
    //     defense: 10,
    //     defenseDefault: 10,
    //     spells: ["Heroic_Strike_Tar$-20"],
    // },
    "Rabid": {
        attack: 10,
        attackDefault: 10,
        speed: 15,
        speedDefault: 15,
        spells: ["Multi_Shot_Tar$40"],
    }
};

class EnemyFactory {
    static createEnemy(baseName: string, modifiers: string[] = []): EnemyType {
        const baseEnemy = baseEnemyDataRecord[baseName];

        const addedMana: number = 50;
        // temporally value

        if (!baseEnemy) {
            throw new Error(`Enemy ${baseName} not found in EnemyData`);
        } 

        // Create unique copies to avoid shared references
        let modifiedEnemy: EnemyType = {
            ...baseEnemy,
            spells: [...baseEnemy.spells],
            resistances: [...baseEnemy.resistances],
            vulnerabilities: [...baseEnemy.vulnerabilities],
            buffs: baseEnemy.buffs ? baseEnemy.buffs.map(b => ({ ...b })) : [],
            debuffs: baseEnemy.debuffs ? baseEnemy.debuffs.map(d => ({ ...d })) : [],
            target: [...baseEnemy.target],
        };

        // Separate the element and class modifiers
        const elementModifiers = modifiers.filter(modifier => {
            return elementEffects[modifier];
        });
        const classModifiers = modifiers.filter(modifier => {
            return classEffects[modifier];
        });

        // Apply element effects first
        elementModifiers.forEach(modifier => {
            const effects = elementEffects[modifier];
            if (effects) {
                modifiedEnemy = {
                    ...modifiedEnemy,
                    name: `${modifier}${baseEnemy.name}`,
                    health: modifiedEnemy.health + (effects.health ?? 0),
                    maxHealth: modifiedEnemy.maxHealth + (effects.maxHealth ?? 0),
                    attack: modifiedEnemy.attack + (effects.attack ?? 0),
                    attackDefault: modifiedEnemy.attackDefault + (effects.attackDefault ?? 0),
                    defense: modifiedEnemy.defense + (effects.defense ?? 0),
                    defenseDefault: modifiedEnemy.defenseDefault + (effects.defenseDefault ?? 0),
                    speed: modifiedEnemy.speed + (effects.speed ?? 0),
                    speedDefault: modifiedEnemy.speedDefault + (effects.speedDefault ?? 0),
                    spells: [...modifiedEnemy.spells, ...(effects.spells ?? [])],
                    resistances: [...modifiedEnemy.resistances, ...(effects.resistances ?? [])],
                    vulnerabilities: [...modifiedEnemy.vulnerabilities, ...(effects.vulnerabilities ?? [])]
                };
            }
        });

        // Apply class effects next
        classModifiers.forEach(modifier => {
            const effects = classEffects[modifier];
            if (effects) {
                modifiedEnemy = {
                    ...modifiedEnemy,
                    name: `${modifier}${modifiedEnemy.name}`,
                    health: modifiedEnemy.health + (effects.health ?? 0),
                    maxHealth: modifiedEnemy.maxHealth + (effects.maxHealth ?? 0),
                    attack: modifiedEnemy.attack + (effects.attack ?? 0),
                    attackDefault: modifiedEnemy.attackDefault + (effects.attackDefault ?? 0),
                    defense: modifiedEnemy.defense + (effects.defense ?? 0),
                    defenseDefault: modifiedEnemy.defenseDefault + (effects.defenseDefault ?? 0),
                    speed: modifiedEnemy.speed + (effects.speed ?? 0),
                    speedDefault: modifiedEnemy.speedDefault + (effects.speedDefault ?? 0), 
                    spells: [...modifiedEnemy.spells, ...(effects.spells ?? [])],
                    resistances: [...modifiedEnemy.resistances, ...(effects.resistances ?? [])],
                    vulnerabilities: [...modifiedEnemy.vulnerabilities, ...(effects.vulnerabilities ?? [])]
                };
            }
        });

        if (baseEnemy.maxMana === 0 && modifiedEnemy.name.includes("Fire") || modifiedEnemy.name.includes("Ice") 
            // || modifiedEnemy.name.includes("Knight") 
        ) {
            modifiedEnemy = {
                ...modifiedEnemy,
                mana: addedMana,
                maxMana: addedMana
            }
        }
        return modifiedEnemy;
    }
}

export const generateInitialEnemies = (): Record<number, EnemyType> => {
    const initialEnemies: Record<number, EnemyType> = {};
    const enemyCount = getEnemyCount();

    for (let i = 0; i < enemyCount; i++) {
        const enemyType = getRandomEnemyType();
        const group = determineEnemyGroup(enemyType);

        const element = getRandomElement();
        const enemyClass = getRandomClass(group);

        let name = enemyType;
        if (group === "humanoide") name = `${element} ${enemyType} ${enemyClass}`.trim();
        else if (group === "beast") name = `${enemyClass} ${element} ${enemyType}`.trim();
        else if (group === "elemental") name = `${element} ${enemyType} ${enemyClass}`.trim();

        const enemy = EnemyFactory.createEnemy(enemyType, [element, enemyClass]);
        enemy.id = i + 100;
        enemy.group = group;
        enemy.name = name;

        initialEnemies[enemy.id] = enemy;
    }

    return initialEnemies;
};

export const generateTutorialEnemies = (): Record<number, EnemyType> => {
    const tutorialEnemies = Object.values(BaseEnemyData).filter(enemy => enemy.isTutorial);
    const enemyRecord: Record<number, EnemyType> = {};

    const modifiers = ["Ice", "Fire"];

    tutorialEnemies.forEach((enemy, index) => {
        const element = modifiers[index];
        const modifiedEnemy = EnemyFactory.createEnemy( enemy.name, [element]);

        modifiedEnemy.id = enemy.id;
        modifiedEnemy.buffs = [];
        modifiedEnemy.debuffs = [];
        modifiedEnemy.order = 0;
        modifiedEnemy.group = determineEnemyGroup(modifiedEnemy.name);

        enemyRecord[modifiedEnemy.id] = modifiedEnemy;
    });

    return enemyRecord;
};


export default EnemyFactory;