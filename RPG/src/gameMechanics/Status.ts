import CharacterAtom from '../atom/CharacterAtom';
import EnemyAtom from '../atom/BaseEnemyAtom';

// We derive the types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

export const getStatus = (enemy: EnemyType, selectedCharacters: CharacterType[]): string => {

    // if enemy status or selected character status is Dead make selected false
    if (enemy.status.includes("Dead") || selectedCharacters.map(char => char.status).includes(["Dead"])) {
        enemy.selected = false;
    }

    return "";
};
