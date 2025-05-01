import { ApplyBlessing } from "./ApplyBlessings";
import { CharacterType } from "../../../atom/CharacterAtom";
import Resistances from "../../Resistances";

export const BlessingOfHolyDamage = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfHolyDamage", {
        attack: character.attack * 1.1,
    });

export const BlessingOfBurn = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfBurn" );

export const BlessingOfManaRegen = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfManaRegen");

export const BlessingOfDamage = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfDamage", {
        attack: character.attack * 1.25,
    });

export const BlessingOfLight = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfLight", {
        resistances: [Resistances.Dark],
    });
