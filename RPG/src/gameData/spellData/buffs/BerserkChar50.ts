import { CharacterType } from "../../../atom/CharacterAtom";

const BerserkChar50 = (character: CharacterType, target: CharacterType, spellCost: number): number => {
    spellCost = 50;
    character.mana -= spellCost;

    target.attack *= 1.5;
    // Make berserk buff

    return target.health;
};

export default BerserkChar50;