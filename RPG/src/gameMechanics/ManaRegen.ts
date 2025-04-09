import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const ManaRegen = () => {
    const manaRegenAmount = 10;
    const energyRegenAmount = 30;

    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => {
            if (char.health <= 0) return char; // Dead, no regen

            if (char.resource_type === "mana") {
                const regenAmount = char.blessings.includes("Blessing of Mana Regen")
                    ? manaRegenAmount * 2
                    : manaRegenAmount;

                return {
                    ...char,
                    mana: Math.min(char.mana + regenAmount, char.maxMana),
                };
            }

            if (char.resource_type === "energy") {
                return {
                    ...char,
                    mana: Math.min(char.mana + energyRegenAmount, char.maxMana),
                };
            }

            return char; // If resource type doesn't match, leave unchanged
        });

        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};
