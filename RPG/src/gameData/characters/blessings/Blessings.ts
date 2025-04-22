import CharacterAtom from "../../../atom/CharacterAtom"
import { storeAtom } from "../../../atom/storeAtom"
import { CharacterType } from "../../../atom/CharacterAtom"
import { BlessingsData } from "./BlessingsData";
import { blessingAtom } from "../../../atom/BlessingsAtom";
import { BlessingOfDamage, BlessingOfFireDamage, BlessingOfHolyDamage, BlessingOfLight, BlessingOfManaRegen } from "./BlessingFactory";


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