import { ApplyBlessing } from "./ApplyBlessings";
import { CharacterType } from "../../../atom/CharacterAtom";
import Resistances from "../../Resistances";

export const BlessingOfLightning = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfLightning", {
        attack: Math.round(character.attack * 1.1),
        attackDefault: Math.round(character.attack * 1.1),
    });

export const BlessingOfBurn = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfBurn" );

export const BlessingOfManaRegen = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfManaRegen");

export const BlessingOfDamage = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfDamage", {
        attack: Math.round(character.attack * 1.5),
        attackDefault: Math.round(character.attack * 1.5),
    });

export const BlessingOfLight = (character: CharacterType) =>
    ApplyBlessing(character, "BlessingOfLight", {
        resistances: [Resistances.Dark],
    });