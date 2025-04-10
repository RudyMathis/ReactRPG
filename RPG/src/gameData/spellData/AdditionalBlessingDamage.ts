import { CharacterType } from "../../atom/CharacterAtom";

export const AdditionalBlessingDamage = (character: CharacterType) => {
    let bonusDamage = 0;

    character.blessings.forEach((blessing) => {
        switch (blessing) {
            case "Blessing of Holy Damage":
                bonusDamage += Math.round(Math.max(10, character.attack * 1.25));
            break;
            case "Blessing of Fire Damage":
                bonusDamage += Math.round(Math.max(10, character.attack * 1.25));
            break;
            // Add more blessing types here
        }
    });

    return bonusDamage;
};