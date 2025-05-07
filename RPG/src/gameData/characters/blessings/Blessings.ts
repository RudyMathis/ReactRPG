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

export const Blessings = () => {
    const Characters = storeAtom.get(CharacterAtom);
    const allCharacters = Object.values(Characters).filter(char => char.health > 0 && char.isSelected);
    const allBlessingKeys = Object.keys(BlessingsData) as (keyof typeof BlessingsData)[];

    const blessingFunctionMap: Record<keyof typeof BlessingsData, (character: CharacterType) => void> = {
        BlessingOfLight,
        BlessingOfDamage,
        BlessingOfHolyDamage,
        BlessingOfBurn,
        BlessingOfManaRegen,
    };

    const shuffledBlessings = [...allBlessingKeys].sort(() => Math.random() - 0.5);
    const shuffledCharacters = [...allCharacters].sort(() => Math.random() - 0.5);

    let applied = false;

    for (const blessingKey of shuffledBlessings) {
        for (const character of shuffledCharacters) {
            const hasBlessing = character.blessings.some(b => b.name === BlessingsData[blessingKey].name);
            if (!hasBlessing) {
                blessingFunctionMap[blessingKey](character);
                applied = true;
                break; 
            }
        }
        if (applied) break;
    }

    if (!applied) {
        console.warn("No eligible character found to receive a blessing.");
    }

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
    }
};