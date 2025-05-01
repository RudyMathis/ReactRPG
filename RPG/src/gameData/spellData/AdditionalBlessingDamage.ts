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

export const BlessingOfHolyDamageBonus = (character: CharacterType, targetEnemy: EnemyType) => {
    if(character.blessings.find(b => b.name === BlessingsData.BlessingOfHolyDamage.name)) {
        targetEnemy.debuffs.push({
            type: Debuffs.Burn.type, 
            duration: 3,
            damage: Debuffs.Burn.damage,
            name: Debuffs.Burn.name,
            icon: Debuffs.Burn.icon
        });
        //  UPDATE TO DO HOLY DEBUFF
    }
};