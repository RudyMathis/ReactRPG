import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Buffs, { Buff } from "../../Buffs";

const spellCost = 50;
const isMoreInfo = true;
const additionalInfo = "Increase defense for the party by 25";

const ProtectPartyChar50 = (
    character: CharacterType
): { id: number; buff: Buff }[] => {
    character.mana -= spellCost;

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    const spellAnimation = 'protect';
    const flashUpdate: Record<number, string | null> = {};

    if (!character.buffs.find(d => d.name === Buffs.Protected.buffName)) {
        flashUpdate[character.id] = spellAnimation;
        character.defense = character.defense + Buffs.Protected.defense;
        character.buffs.push(
            {
                name: Buffs.Protected.buffName,
                type: Buffs.Protected.type,
                duration: 3,
            }
        );
    }

    selectedCharacters.forEach(targetChar => {
        flashUpdate[targetChar.id] = spellAnimation;
        if (!targetChar.buffs.find(d => d.name === Buffs.Protected.buffName)) {
            targetChar.defense = targetChar.defense + Buffs.Protected.defense;
            targetChar.buffs.push(
                {
                    name: Buffs.Protected.buffName,
                    type: Buffs.Protected.type,
                    duration: 3,
                }
            );
        }
    });

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

    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.Protected }));
};

export { spellCost, isMoreInfo, additionalInfo };
export default ProtectPartyChar50;