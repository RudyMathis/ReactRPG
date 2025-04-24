import { CharacterType } from "../../../atom/CharacterAtom";

const HealChar20 = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
): { id: string; health: number }[] => {
    const heal = 20;
    spellCost = 20;
    character.mana -= spellCost;

    const targetChar = character.id === target.id ? character : target;

    targetChar.health = Math.min(targetChar.health + heal, targetChar.maxHealth);

    return [{ id: targetChar.id.toString(), health: targetChar.health }];
};

export default HealChar20;