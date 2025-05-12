import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";

const spellCost = 40;
const statValue = 15;
const HealAllChar40 = (
    character: CharacterType
): { id: number; health: number }[] => {
    const heal = statValue;
    character.mana -= spellCost;

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    const spellAnimation = 'heal';
    const flashUpdate: Record<number, string | null> = {};


    selectedCharacters.forEach(targetChar => {
        flashUpdate[targetChar.id] = spellAnimation;

        if(targetChar.health > targetChar.maxHealth) {
            // console.log("taunted char", targetChar.name)
        } else if(targetChar.health + heal > targetChar.maxHealth) {
            targetChar.health = targetChar.maxHealth;
        } else {
            targetChar.health = targetChar.health + heal;
        }
    });

    flashUpdate[character.id] = spellAnimation;
    if(character.health > character.maxHealth) {
        // console.log("taunted char", character.name)
    } else if(character.health + heal > character.maxHealth) {
        character.health = character.maxHealth;
    } else {
        character.health = character.health + heal;
    }

    storeAtom.set(FlashAnimationAtom, (prev) => ({ ...prev, ...flashUpdate }));
    setTimeout(() => {
        storeAtom.set(FlashAnimationAtom, (prev) => {
            const next = { ...prev };
            selectedCharacters.forEach(char => {
                next[char.id] = null;
            });
            return next;
        });
    }, 900);

    return selectedCharacters;
};

export { spellCost, statValue };
export default HealAllChar40;