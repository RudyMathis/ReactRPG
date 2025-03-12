import { atom } from 'jotai';
import CharacterAtom from '../atom/CharacterAtom'; // Import existing CharacterAtom
import EnemyAtom from '../atom/BaseEnemyAtom'; // Import existing EnemyAtom

// This atom holds the turn order, which is a combination of selected characters and all enemies, sorted by speed.
const turnOrderAtom = atom(
  (get) => {
    const characters = Object.values(get(CharacterAtom)).filter(char => char.selected);
    const enemies = Object.values(get(EnemyAtom));

    const allEntities = [...characters, ...enemies];

    // Sort entities by speed in descending order (highest to lowest)
    return allEntities.sort((a, b) => b.speed - a.speed);
  }
);

// This atom keeps track of the turn logic state, whether it's active or paused.
const turnLogicStateAtom = atom<boolean>(false);

export { turnOrderAtom, turnLogicStateAtom };
