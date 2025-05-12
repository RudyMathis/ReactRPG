import { atom } from 'jotai';

type HoveredSpellInfo = {
    label: string;
    affectedEntityIds: number[];
};

export const hoveredSpellAtom = atom<HoveredSpellInfo | null>(null);