import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { BlessingsData } from "./BlessingsData";

type PartialCharacterUpdate = Partial<Pick<CharacterType, 'attack' | 'resistances' | 'attackDefault'>>;

export const ApplyBlessing = (
    character: CharacterType,
    blessingKey: keyof typeof BlessingsData,
    updates: PartialCharacterUpdate = {}
) => {
    const blessingData = BlessingsData[blessingKey];

    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        if(updatedChar.health > updatedChar.maxHealth) {
            updatedChar.health = updatedChar.maxHealth;
        }

        const updated: CharacterType = {
            ...updatedChar,
            ...updates,
            resistances: updates.resistances
                ? [...updatedChar.resistances, ...updates.resistances]
                : updatedChar.resistances,
            blessings: [...updatedChar.blessings, blessingData],
            debuffs: [],
            buffs: [],
            speed: updatedChar.speedDefault,
            attack: updatedChar.attackDefault,
            defense: updatedChar.defenseDefault
        };

        return {
            ...prev,
            [character.id]: updated,
        };
    });
};
