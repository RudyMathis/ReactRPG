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

    if (targetType.includes("TargetSpeedLow")) {
        return aliveCharacters.reduce((lowest, current) =>
            current.speedDefault < lowest.speedDefault ? current : lowest
        );
    }

    if (targetType.includes("TargetHealthLow")) {
        return aliveCharacters.reduce((lowest, current) =>
            current.health < lowest.health ? current : lowest
        );
    }

    if (targetType.includes("TargetDefenseLow")) {
        return aliveCharacters.reduce((lowest, current) =>
            current.defense < lowest.defense ? current : lowest
        );
    }

    if (targetType.includes("TargetRandom")) {
        const randomIndex = Math.floor(Math.random() * aliveCharacters.length);
        return aliveCharacters[randomIndex];
    }

    // 3. Fallback: just pick the first one
    return aliveCharacters[0];
};
