import type { CharacterType } from '../../atom/CharacterAtom';
import type { EnemyType } from '../../atom/BaseEnemyAtom';

export const getEnemyTargetName = (enemy: EnemyType, selectedCharacters: CharacterType[]): string => {
    // Filter out characters who are dead
    const aliveCharacters = selectedCharacters.filter(character => !character.debuff.some(d => d.type == "Dead"));

    if (aliveCharacters.length === 0) return ""; // If no alive characters, return empty string

    if (enemy.target.includes("TargetSpeedLow")) {
        const sorted = [...aliveCharacters].sort((a, b) => a.speed - b.speed);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetRandom")) {
        const sorted = [...aliveCharacters].sort(() => Math.random() - 0.5);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetHealthLow")) {
        const sorted = [...aliveCharacters].sort((a, b) => a.health - b.health);
        return sorted[0].name;
    }

    if (enemy.target.includes("TargetLuckLow")) {
        const sorted = [...aliveCharacters].sort((a, b) => a.luck - b.luck);
        return sorted[0].name;
    }

    return "";
};
