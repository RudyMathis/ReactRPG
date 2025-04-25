import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";

const HealAllChar40 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: string; health: number }[] => {
    const heal = 15;
    spellCost = 40;
    character.mana -= spellCost;

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    const updatedCharacters: { id: string; health: number }[] = [];

    selectedCharacters.forEach(targetChar => {
        targetChar.health = Math.min(targetChar.health + heal, targetChar.maxHealth);
        updatedCharacters.push({ id: String(targetChar.id), health: targetChar.health });
    });

    return updatedCharacters;
};

export default HealAllChar40;