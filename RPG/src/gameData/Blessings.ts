import CharacterAtom from "../atom/CharacterAtom"
import { storeAtom } from "../atom/storeAtom"
import Resistances from "./Resistances"
import { CharacterType } from "../atom/CharacterAtom"
import { BlessingsData } from "./characters/BlessingsData";
import { blessingAtom } from "../atom/BlessingsAtom";

export const Blessings = (character: CharacterType) => {
    const allCharacters = storeAtom.get(CharacterAtom);
    const liveCharacter = allCharacters[character.id];

    const currentBlessings = liveCharacter.blessings;
    const availableBlessings = BlessingsData.filter(b => !currentBlessings.includes(b));

    if (availableBlessings.length === 0) {
        console.log(`${liveCharacter.name} already has all blessings.`);
        checkIfAllSelectedCharactersAreFullyBlessed();
        return;
    }

    const selected = availableBlessings[Math.floor(Math.random() * availableBlessings.length)];

    switch (selected) {
        case "Blessing of Light":
            BlessingOfLight(liveCharacter);
            break;
        case "Blessing of Damage":
            BlessingOfDamage(liveCharacter);
            break;
        case "Blessing of Holy Damage":
            BlessingOfHolyDamage(liveCharacter);
            break;
        case "Blessing of Fire Damage":
            BlessingOfFireDamage(liveCharacter);
            break;
        case "Blessing of Mana Regen":
            BlessingOfManaRegen(liveCharacter);
            break;
    }

    checkIfAllSelectedCharactersAreFullyBlessed();
};

const checkIfAllSelectedCharactersAreFullyBlessed = () => {
    const allCharacters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = allCharacters.filter(char => char.isSelected);

    const fullyBlessed = selectedCharacters.every(char =>
        BlessingsData.every(bless => char.blessings.includes(bless))
    );

    if (fullyBlessed) {
        storeAtom.set(blessingAtom, true);
        console.log("🎉 All selected characters have all blessings!");
    }
};

const BlessingOfLight = (character: CharacterType) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated = {
            ...prev,
            [character.id]: {
                ...updatedChar,
                resistances: [...updatedChar.resistances, Resistances.Dark],
                blessings: [...updatedChar.blessings, "Blessing of Light"],
            }
        };
        console.log("updated", updated, "updatedChar", updatedChar);

        return updated;
    });
};

const BlessingOfDamage = (character: CharacterType) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated = {
            ...prev,
            [character.id]: {
                ...updatedChar,
                attack: updatedChar.attack * 1.25,
                blessings: [...updatedChar.blessings, "Blessing of Damage"],
            }
        };

        return updated;
    });
};

const BlessingOfHolyDamage = (character: CharacterType) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated = {
            ...prev,
            [character.id]: {
                ...updatedChar,
                blessings: [...updatedChar.blessings, "Blessing of Holy Damage"],
            }
        };

        return updated;
    });
};

const BlessingOfFireDamage = (character: CharacterType) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated = {
            ...prev,
            [character.id]: {
                ...updatedChar,
                blessings: [...updatedChar.blessings, "Blessing of Fire Damage"],
            }
        };

        return updated;
    });
};

const BlessingOfManaRegen = (character: CharacterType) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedChar = prev[character.id];

        const updated = {
            ...prev,
            [character.id]: {
                ...updatedChar,
                blessings: [...updatedChar.blessings, "Blessing of Mana Regen"],
            }
        };

        return updated;
    });
};
