import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { BlessingsData } from "./BlessingsData";

type PartialCharacterUpdate = Partial<Pick<CharacterType, 'attack' | 'resistances'>>;

export const ApplyBlessing = (
    character: CharacterType,
    blessingKey: keyof typeof BlessingsData,
    updates: PartialCharacterUpdate = {}
) => {
    const blessingData = BlessingsData[blessingKey];

    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated: CharacterType = {
            ...updatedChar,
            ...updates,
            resistances: updates.resistances
                ? [...updatedChar.resistances, ...updates.resistances]
                : updatedChar.resistances,
            blessings: [...updatedChar.blessings, blessingData],
        };

        console.log("updated", updated);

        return {
            ...prev,
            [character.id]: updated,
        };
    });
};
