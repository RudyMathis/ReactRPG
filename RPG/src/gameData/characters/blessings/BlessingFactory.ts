import { ApplyBlessing } from "./ApplyBlessings";
import { CharacterType } from "../../../atom/CharacterAtom";
import Resistances from "../../Resistances";

export const BlessingOfHolyDamage = (character: CharacterType) => ApplyBlessing(character, "Blessing of Holy Damage");

export const BlessingOfFireDamage = (character: CharacterType) => ApplyBlessing(character, "Blessing of Fire Damage");

export const BlessingOfManaRegen = (character: CharacterType) => ApplyBlessing(character, "Blessing of Mana Regen");

export const BlessingOfDamage = (character: CharacterType) =>
    ApplyBlessing(character, "Blessing of Damage", {
        attack: character.attack * 1.25,
    }
);

export const BlessingOfLight = (character: CharacterType) =>
    ApplyBlessing(character, "Blessing of Light", {
        resistances: [Resistances.Dark],
    }
);