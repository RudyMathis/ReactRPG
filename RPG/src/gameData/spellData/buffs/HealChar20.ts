import { CharacterType } from "../../../atom/CharacterAtom";

const HealChar20 = (character: CharacterType, target: CharacterType, spellCost: number): number => {
    const heal = 20;
    spellCost = 20;
    character.mana -= spellCost;

    if (character.id === target.id) {
        character.health = Math.min(character.health + heal, character.maxHealth);
        return character.health;
    } else {
        target.health = Math.min(target.health + heal, target.maxHealth);
        return target.health;
    }
};

export default HealChar20;