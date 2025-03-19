import type { CharacterType } from '../../atom/CharacterAtom';
import type { EnemyType } from '../../atom/BaseEnemyAtom';

export const getEnemyTargetName = (enemy: EnemyType, selectedCharacters: CharacterType[]): string => {

    if (enemy.target.includes("TargetSpeedLow") && selectedCharacters.length > 0) {
        const sorted = [...selectedCharacters].sort((a, b) => a.speed - b.speed);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetRandom") && selectedCharacters.length > 0) {
        const sorted = [...selectedCharacters].sort(() => Math.random() - 0.5);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetHealthLow") && selectedCharacters.length > 0) {
        const sorted = [...selectedCharacters].sort((a, b) => a.health - b.health);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetLuckLow") && selectedCharacters.length > 0) {
        const sorted = [...selectedCharacters].sort((a, b) => a.luck - b.luck);
        return sorted[0].name;
    }

    return "";
};
