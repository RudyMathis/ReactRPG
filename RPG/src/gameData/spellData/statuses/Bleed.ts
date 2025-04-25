import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";

export const Bleed = (entity: CharacterType | EnemyType) => {
    if(entity.type === "player"){
        const baseDamage = Debuffs.Bleed.damage;

        const damage = Math.max(5, baseDamage - entity.defense);
        console.log("damage", damage, "baseDamage", baseDamage - entity.defense);
        HandleDamageEffect(damage, "Physical", "player", entity.id);
        return damage;
    } else {
        const baseDamage = Debuffs.Burn.damage;

        const damage = Math.max(5, baseDamage - entity.defense);
        console.log("damage", damage, "baseDamage", baseDamage - entity.defense);
        HandleDamageEffect(damage, "Physical", "npc", entity.id);
        return damage;  
    }
}