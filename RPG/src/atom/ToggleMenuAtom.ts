import { atom } from 'jotai';

type EntityType = 'character' | 'enemy' | null;

export const activeMenuAtom = atom<{ id: number | null; type: EntityType }>({
    id: null,
    type: null,
});

export const toggleMenuAtom = atom(null, (_get, set, payload: { id: number | null; type: EntityType }) => {
    if(payload.id === null && payload.type === null) {
        set(activeMenuAtom, { id: null, type: null });
    } else {
        set(activeMenuAtom, payload);
    }
});