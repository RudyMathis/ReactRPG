import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const GainExperience = (enemyAmount: number, charactersAmount: number) => {
    storeAtom.set(CharacterAtom, (prev) => {
        const updatedCharacters = Object.values(prev).map((char) => {
            if (char.health > 0 && char.isSelected) {
                const expGained = Math.round(10 * char.level * (enemyAmount / charactersAmount));
                let totalExp = char.exp + expGained;
                let level = char.level;
                let maxExp = level * 100;

                // Handle level-ups (may be multiple)
                while (totalExp >= maxExp) {
                    totalExp -= maxExp;
                    level += 1;
                    maxExp = level * 100;
                }

                const levelUpBonus = (level - char.level) * 3;

                console.log("expGained", expGained, "finalExp", totalExp, "level", level, "maxExp", maxExp);

                return {
                    ...char,
                    exp: totalExp,
                    level: level,
                    maxExp: maxExp,
                    health: char.health + levelUpBonus,
                    maxHealth: char.maxHealth + levelUpBonus,
                    attack: char.attackDefault + levelUpBonus,
                    attackDefault: char.attackDefault + levelUpBonus,
                    defense: char.defenseDefault + levelUpBonus,
                    defenseDefault: char.defenseDefault + levelUpBonus,
                    speed: char.speedDefault + levelUpBonus,
                    speedDefault: char.speedDefault + levelUpBonus,
                    mana: char.mana > 0 ? char.mana + levelUpBonus : 0,
                    maxMana: char.maxMana > 0 ? char.maxMana + levelUpBonus : 0,
                    buffs: [],
                    debuffs: [],
                };
            }
            return char;
        });

        console.log("EXPERIENCE GAIN", updatedCharacters);

        return Object.fromEntries(updatedCharacters.map((char) => [char.id, char]));
    });
};
