import { CharacterType } from "../../../atom/CharacterAtom";

const MeditateChar30 = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
): { id: number; mana: number } => {
    const manaRestore = 30;
    spellCost = 0;
    character.mana += spellCost;

    if (character.id !== target.id) {
      return { id: character.id, mana: character.mana };
    }

    character.mana = Math.min(character.mana + manaRestore, character.maxMana);
    return { id: character.id, mana: character.mana };
};

export default MeditateChar30;