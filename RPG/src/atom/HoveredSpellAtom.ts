import { atom } from 'jotai';

type HoveredSpellInfo = {
    label: string;
    affectedEntityIds: number[];
    adjustedDamage?: number[];
    resistance?: boolean[];
    vulnerability?: boolean[];
    statValues?: number[];
};

export const hoveredSpellAtom = atom<HoveredSpellInfo | null>(null);