import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { BlessingsData } from "./BlessingsData";
import {
    BlessingOfDamage,
    BlessingOfBurn,
    BlessingOfHolyDamage,
    BlessingOfLight,
    BlessingOfManaRegen,
} from "./BlessingFactory";
import { blessingAtom } from "../../../atom/BlessingsAtom";

export const Blessings = (character: CharacterType) => {
    const Characters = storeAtom.get(CharacterAtom);
    const allCharacters = Object.values(Characters).filter(char => char.health > 0 && char.isSelected);
    const liveCharacter = allCharacters.find(char => char.id === character.id);

    if (!liveCharacter) {
        console.log(`Character with id ${character.id} is dead or not found.`);
        return;
    }

    const currentBlessings = liveCharacter.blessings;
    const allBlessingKeys = Object.keys(BlessingsData) as (keyof typeof BlessingsData)[];

    // Only blessings the character doesn't already have
    const availableBlessings = allBlessingKeys.filter(
        key => !currentBlessings.some(cb => cb.name === BlessingsData[key].name)
    );

    if (availableBlessings.length === 0) {
        console.log(`${liveCharacter.name} already has all blessings.`);
        checkIfAllSelectedCharactersAreFullyBlessed();
        return;
    }

    // Randomly select from available blessings
    const selectedKey = availableBlessings[Math.floor(Math.random() * availableBlessings.length)];

    const blessingFunctionMap: Record<keyof typeof BlessingsData, (character: CharacterType) => void> = {
        BlessingOfLight,
        BlessingOfDamage,
        BlessingOfHolyDamage,
        BlessingOfBurn,
        BlessingOfManaRegen,
    };

    blessingFunctionMap[selectedKey](liveCharacter);

    console.log(`${liveCharacter.name} received blessing: ${BlessingsData[selectedKey].name}`);
    checkIfAllSelectedCharactersAreFullyBlessed();
};


const checkIfAllSelectedCharactersAreFullyBlessed = () => {
    const allCharacters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = allCharacters.filter(char => char.isSelected);
    const allBlessingKeys = Object.keys(BlessingsData) as (keyof typeof BlessingsData)[];

    const fullyBlessed = selectedCharacters.every(char =>
        allBlessingKeys.every(key =>
            char.blessings.some(cb => cb.name === BlessingsData[key].name)
        )
    );

    if (fullyBlessed) {
        storeAtom.set(blessingAtom, true);
        console.log("🎉 All selected characters have all blessings!");
    }
};