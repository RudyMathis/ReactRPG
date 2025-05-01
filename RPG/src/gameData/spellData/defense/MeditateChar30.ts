import { CharacterType } from "../../../atom/CharacterAtom";
import { BlessingsData } from "../../characters/blessings/BlessingsData";

const MeditateChar30 = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
): { id: number; mana: number } => {
    let manaRestore = 30;
    if(character.blessings.some(d => d.name === BlessingsData.BlessingOfManaRegen.name)) {
        manaRestore *= 2;
    }
    
    spellCost = 0;
    character.mana += spellCost;

    if (character.id !== target.id) {
      return { id: character.id, mana: character.mana };
    }

    character.mana = Math.min(character.mana + manaRestore, character.maxMana);
    return { id: character.id, mana: character.mana };
};

export default MeditateChar30;