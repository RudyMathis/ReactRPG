import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { BlessingsData } from "../characters/blessings/BlessingsData";
import Debuffs from "../Debuffs";

export const BlessingOfBurnBonus = (character: CharacterType, targetEnemy: EnemyType) => {
    if(character.blessings.find(b => b.name === BlessingsData.BlessingOfBurn.name)) {
        targetEnemy.debuffs.push({
            type: Debuffs.Burn.type, 
            duration: 3,
            damage: Debuffs.Burn.damage,
            name: Debuffs.Burn.name,
            icon: Debuffs.Burn.icon
        });
    }
};

export const BlessingOfLightningBonus = (character: CharacterType, targetEnemy: EnemyType) => {
    if(character.blessings.find(b => b.name === BlessingsData.BlessingOfLightning.name)) {
        targetEnemy.mana = Math.round(targetEnemy.mana / 2);
    }
};