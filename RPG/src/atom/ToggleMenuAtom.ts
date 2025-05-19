import { atom } from 'jotai';

type EntityType = 'character' | 'enemy' | null;

export const activeMenuAtom = atom<{ id: number | null; type: EntityType }>({
    id: null,
    type: null,
});

export const toggleMenuAtom = atom(null, (_get, set, payload: { id: number | null; type: EntityType }) => {
    set(activeMenuAtom, payload);
});