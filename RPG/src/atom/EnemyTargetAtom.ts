import { atom } from 'jotai';

// Define an atom for the enemy's target
export const EnemyTargetAtom = atom<Record<number, string>>({});
