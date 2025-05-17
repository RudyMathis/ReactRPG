import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = -10;
const damageMulitplier = .9;

const LeechTar10 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana += Math.abs(spellCost);

        const damage = Math.max(10, Math.round(enemy.attack * damageMulitplier))
        const darkResistance = character.resistances.find(res => res.type ===  Resistances.Dark.type);
        const darkVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Dark.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Dark.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Dark.value)
        
        if (darkResistance) {
            HandleDamageEffect(damageResistance, "Dark", "player", character.id);
            return character.health -= damageResistance;
        } else if (darkVulnerability) {
            HandleDamageEffect(damageVulnerability, "Dark", "player", character.id);
            return character.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Dark", "player", character.id);
            return character.health -= damage;
        }
    } else {
        character.mana += Math.abs(spellCost);
        
        const damage = Math.max(character.attack * damageMulitplier);
        const darkResistance = enemy.resistances.find(res => res.type ===  Resistances.Dark.type);
        const darkVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Dark.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Dark.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Dark.value)

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        
        if (darkResistance) {
            HandleDamageEffect(damageResistance, "Dark", "npc", enemy.id);
            return enemy.health -= damageResistance;
        } else if (darkVulnerability) {
            HandleDamageEffect(damageVulnerability, "Dark", "npc", enemy.id);
            return enemy.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Dark", "npc", enemy.id);
            return enemy.health -= damage;
        }
    }
}

export { spellCost, damageMulitplier };
export default LeechTar10