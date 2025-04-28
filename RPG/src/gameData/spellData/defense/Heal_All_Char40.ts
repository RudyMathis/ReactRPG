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

    const updatedCharacters: { id: number; health: number }[] = [];

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    selectedCharacters.forEach(targetChar => {
        if(targetChar.health > targetChar.maxHealth) {
            // accounting for charcters pushed pass health from buffs
            updatedCharacters.push({ id: targetChar.id, health: targetChar.health });
            console.log("taunted", targetChar.name)
        } else if(targetChar.health + heal > targetChar.maxHealth) {
            targetChar.health = targetChar.maxHealth;
            updatedCharacters.push({ id: targetChar.id, health: targetChar.maxHealth });
            console.log("maxed out", targetChar.name)
        } else {
            console.log("pre heal", targetChar.name, targetChar.health)
            targetChar.health += heal;
            updatedCharacters.push({ id: targetChar.id, health: targetChar.health });
            console.log("normal post heal", targetChar.name, targetChar.health)
        }
    });

    return updatedCharacters;
};

export default HealAllChar40;