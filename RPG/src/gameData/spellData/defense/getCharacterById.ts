import { storeAtom } from "../../../atom/storeAtom";
import CharacterAtom from "../../../atom/CharacterAtom";

export const getCharacterById = (id: number) => {
    const characters = Object.values(storeAtom.get(CharacterAtom));
    return characters.find(c => c.id === id);
};