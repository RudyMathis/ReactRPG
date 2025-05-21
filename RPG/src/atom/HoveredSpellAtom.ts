import { atom } from 'jotai';

type HoveredSpellInfo = {
    label: string;
    affectedEntityIds: number[];
    adjustedDamage?: number[];
    statValues?: number[];
};

export const hoveredSpellAtom = atom<HoveredSpellInfo | null>(null);