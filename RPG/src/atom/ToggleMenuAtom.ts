import { atom } from 'jotai';

type EntityType = 'character' | 'enemy' | null;

export const activeMenuAtom = atom<{ id: number | null; type: EntityType }>({
    id: null,
    type: null,
});

export const toggleMenuAtom = atom(null, (get, set, payload: { id: number | null; type: EntityType }) => {
    const prev = get(activeMenuAtom);
    const prevId = prev.id;
    const prevType = prev.type;
    if(payload.id === null && payload.type === null) {
        set(activeMenuAtom, { id: null, type: null });
        console.log("clicked away");
    } else {
        set(activeMenuAtom, payload);
        console.log(payload.id, prevId);
        console.log(payload.type, prevType);
    }
});