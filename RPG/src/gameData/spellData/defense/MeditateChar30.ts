import { CharacterType } from "../../../atom/CharacterAtom";
import { BlessingsData } from "../../characters/blessings/BlessingsData";

const spellCost = 0;
const statValue = 30;
const isMoreInfo = true;
const additionalInfo = 'Restores 30 mana';
const MeditateChar30 = (
    character: CharacterType,
    target: CharacterType
): { id: number; mana: number } => {
    let manaRestore = 30;
    if(character.blessings.some(d => d.name === BlessingsData.BlessingOfManaRegen.name)) {
        manaRestore *= 2;
    }
    
    character.mana += spellCost;

    if (character.id !== target.id) {
        return { id: character.id, mana: character.mana };
    }

    character.mana = Math.min(character.mana + manaRestore, character.maxMana);
    return { id: character.id, mana: character.mana };
};

export { spellCost, statValue, isMoreInfo, additionalInfo };
export default MeditateChar30;