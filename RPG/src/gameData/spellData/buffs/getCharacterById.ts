// utils/getCharacterById.ts
import { storeAtom } from "../../../atom/storeAtom";
import CharacterAtom from "../../../atom/CharacterAtom";

export const getCharacterById = (id: string) => {
    const characters = Object.values(storeAtom.get(CharacterAtom));
    return characters.find(char => char.id.toString() === id);
};