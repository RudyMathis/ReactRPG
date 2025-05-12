import { atom } from 'jotai';

type HoveredSpellInfo = {
    label: string;
    affectedEnemyIds: number[];
};

export const hoveredSpellAtom = atom<HoveredSpellInfo | null>(null);