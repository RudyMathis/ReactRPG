import{ EnemyType } from "../../../atom/BaseEnemyAtom";
import{ CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";
import Resistances from "../../Resistances";
import Vulnerabilities from "../../Vulnerabilities";

export const Burn = (entity: CharacterType | EnemyType) => {
    if(entity.type === "player"){
        const baseDamage = Debuffs.Burn.damage;
        const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilities.Fire.type)?.value ?? 0;
        const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
        const damage = Math.max(5, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
        HandleDamageEffect(damage, "Fire", "player", entity.id);
        return damage;
    } else {
        const baseDamage = Debuffs.Burn.damage;
        const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilities.Fire.type)?.value ?? 0;
        const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
        const damage = Math.max(5, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
        HandleDamageEffect(damage, "Fire", "npc", entity.id);
        return damage;  
    }
}