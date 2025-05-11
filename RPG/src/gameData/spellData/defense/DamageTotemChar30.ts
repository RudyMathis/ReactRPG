import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import { storeAtom } from "../../../atom/storeAtom";
import Buffs, { Buff } from "../../Buffs";

const spellCost = 30;
const isMoreInfo = true;
const additionalInfo = "Increase attack damage for the party";

const DamageTotemChar30 = (
    character: CharacterType
): { id: number; buff: Buff }[] => {
    character.mana -= spellCost;

    const characters = Object.values(storeAtom.get(CharacterAtom));
    const selectedCharacters = characters.filter(
        char => char.isSelected && char.health > 0
    );

    const spellAnimation = 'meditate';
    const flashUpdate: Record<number, string | null> = {};

    if(!character.buffs.find(d => d.name === Buffs.DamageTotem.buffName)) {
        flashUpdate[character.id] = spellAnimation;
        character.attack = character.attack + Buffs.DamageTotem.attack;
        character.buffs.push(
            {
                name: Buffs.DamageTotem.buffName,
                type: Buffs.DamageTotem.type,
                duration: 3,
            }
        );
    }

    selectedCharacters.map(targetChar => {
        flashUpdate[targetChar.id] = spellAnimation;
        if (!targetChar.buffs.find(d => d.name === Buffs.DamageTotem.buffName)) {
            targetChar.attack = targetChar.attack + Buffs.DamageTotem.attack;
            targetChar.buffs.push(
                {
                    name: Buffs.DamageTotem.buffName,
                    type: Buffs.DamageTotem.type,
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


    return selectedCharacters.map(char => ({ id: char.id, buff: Buffs.DamageTotem }));
};

export { spellCost, isMoreInfo, additionalInfo };
export default DamageTotemChar30;