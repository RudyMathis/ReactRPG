import { CharacterType } from "../../../atom/CharacterAtom";

const CureChar10 = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
    ): { id: string; health: number }[] => {
        spellCost = 10;
        character.mana -= spellCost;
    
        if (target.debuffs.length > 0 && target.health > 0) {
            target.debuffs.length = 0;
        }
    
        return [{ id: target.id.toString(), health: target.health }];
    };

export default CureChar10;