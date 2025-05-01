import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";

const HealAllChar40 = (
    character: CharacterType,
    _target: CharacterType,
    spellCost: number
): { id: number; health: number }[] => {
    const heal = 15;
    spellCost = 40;
    character.mana -= spellCost;

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    selectedCharacters.forEach(targetChar => {
        if(targetChar.health > targetChar.maxHealth) {
            console.log("taunted char", targetChar.name)
        } else if(targetChar.health + heal > targetChar.maxHealth) {
            targetChar.health = targetChar.maxHealth;
        } else {
            targetChar.health = targetChar.health + heal;
        }
    });

    if(character.health > character.maxHealth) {
        console.log("taunted char", character.name)
    } else if(character.health + heal > character.maxHealth) {
        character.health = character.maxHealth;
    } else {
        character.health = character.health + heal;
    }

    return selectedCharacters;
};

export default HealAllChar40;