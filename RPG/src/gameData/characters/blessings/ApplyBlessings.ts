import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";

type PartialCharacterUpdate = Partial<Pick<CharacterType, 'attack' | 'resistances'>>;

export const ApplyBlessing = (
    character: CharacterType,
    blessingName: string,
    updates: PartialCharacterUpdate = {}
) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated: CharacterType = {
            ...updatedChar,
            ...updates,
            resistances: updates.resistances
                ? [...updatedChar.resistances, ...updates.resistances]
                : updatedChar.resistances,
            blessings: [...updatedChar.blessings, blessingName],
        };

        return {
            ...prev,
            [character.id]: updated,
        };
    });
};