import type { CharacterType } from '../../atom/CharacterAtom';
import type { EnemyType } from '../../atom/BaseEnemyAtom';

export const getEnemyTarget = (
    enemy: EnemyType,
    aliveCharacters: CharacterType[]
): CharacterType | null => {
    if (aliveCharacters.length === 0) return null;

    const taunter = aliveCharacters.find(char =>
        char.buffs.some(buff => buff.name === "Taunter")
    );

    if (taunter) {
        return taunter;
    }

    const targetType = enemy.target;
    const randomIndex = Math.floor(Math.random() * aliveCharacters.length);

    switch (true) {
        case targetType.includes("TargetSpeedLow"):
            return aliveCharacters.reduce((lowest, current) =>
                current.speedDefault < lowest.speedDefault ? current : lowest
            );

        case targetType.includes("TargetHealthLow"):
            return aliveCharacters.reduce((lowest, current) =>
                current.maxHealth < lowest.maxHealth ? current : lowest
            );

        case targetType.includes("TargetDefenseLow"):
            return aliveCharacters.reduce((lowest, current) =>
                current.defenseDefault < lowest.defenseDefault ? current : lowest
            );
        case targetType.includes("TargetManaHigh"):
            return aliveCharacters.reduce((highest, current) =>
                current.maxMana > highest.maxMana ? current : highest
            );

        case targetType.includes("TargetRandom"):
            return aliveCharacters[randomIndex];

        default:
            return aliveCharacters[0];
    }
};
