import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";
import { BlessingsData } from "../gameData/characters/blessings/BlessingsData";

export const ManaRegen = () => {
    const manaRegenAmount = 10;
    const energyRegenAmount = 20;
    const rageRegenAmount = 0;

    const blessingManaRegenAmount = manaRegenAmount * 2;
    const blessingEnergyRegenAmount = energyRegenAmount * 1.5;
    const blessingRageRegenAmount = rageRegenAmount + 10;
    const blessingName = BlessingsData.BlessingOfManaRegen.name

    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => {
            if (char.health <= 0) return char; // Dead, no regen

            if (char.resource_type === "mana") {
                const regenAmount = char.blessings.some(b => b.name === blessingName)
                    ? blessingManaRegenAmount
                    : manaRegenAmount;
                console.log("CHARACTER MANA", char.name, char.mana, "regenAmount", regenAmount, "blessing", char.blessings.some(b => b.name === blessingName));
                return {
                    ...char,
                    mana: Math.min(char.mana + regenAmount, char.maxMana),
                };
            }

            if (char.resource_type === "energy") {
                const regenAmount = char.blessings.some(b => b.name === blessingName)
                ? blessingEnergyRegenAmount
                : energyRegenAmount;

                return {
                    ...char,
                    mana: Math.min(char.mana + regenAmount, char.maxMana),
                };
            }

            if (char.resource_type === "rage") {
                const regenAmount = char.blessings.some(b => b.name === blessingName)
                ? blessingRageRegenAmount
                : rageRegenAmount;
                
                return {
                    ...char,
                    mana: Math.min(char.mana + regenAmount, char.maxMana),
                };
            }

            return char; // If resource type doesn't match, leave unchanged
        });

        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};
