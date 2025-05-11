import { CharacterType } from "../../../atom/CharacterAtom";

const spellCost = 10;
const isMoreInfo = true;
const additionalInfo = "Removes all debuffs";
const CureChar10 = (
    character: CharacterType,
    target: CharacterType
    ): { id: number; health: number }[] => {
        character.mana -= spellCost;
    
        if (target.debuffs.length > 0 && target.health > 0) {
            target.debuffs.length = 0;
        }
    
        return [{ id: target.id, health: target.health }];
    };

export { spellCost, isMoreInfo, additionalInfo };
export default CureChar10;