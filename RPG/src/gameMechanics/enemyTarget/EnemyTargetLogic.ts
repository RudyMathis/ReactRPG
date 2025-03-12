import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';

// We derive the types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

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
