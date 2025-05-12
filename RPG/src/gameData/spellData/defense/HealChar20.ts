import { CharacterType } from "../../../atom/CharacterAtom";

const spellCost = 20;
const statValue = 20;
const HealChar20 = (
    character: CharacterType,
    target: CharacterType
): { id: number; health: number }[] => {
    const heal = statValue;
    character.mana -= spellCost;

    const targetChar = character.id === target.id ? character : target;

    targetChar.health = Math.min(targetChar.health + heal, targetChar.maxHealth);

    return [{ id: targetChar.id, health: targetChar.health }];
};

export { spellCost, statValue };
export default HealChar20;