import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = 20;
const damageMulitplier = 1;

const FrostbiteTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;
    
        const damage = Math.round(enemy.attack * damageMulitplier)
        const iceResistance = character.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = character.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.name);
        const damageResistance = Math.max(5, Math.round(damage- Resistances.Ice.value))
        const damageVulnerability = Math.round(damage+ Vulnerabilites.Ice.value)
        
        if(iceResistance) {
            HandleDamageEffect(damageResistance, "Ice", "player", character.id);
            return character.health - damageResistance;
        } else if (iceVulnerability) {
            HandleDamageEffect(damageVulnerability, "Ice", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Ice", "player", character.id);
            return character.health - damage;
        }
    } else {
        character.mana -= spellCost;
    
        const damage = Math.round(character.attack * damageMulitplier)
        const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Ice.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Ice.value)

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        
        if(iceResistance) {
            HandleDamageEffect(damageResistance, "Ice", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (iceVulnerability) {
            HandleDamageEffect(damageVulnerability, "Ice", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Ice", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export { spellCost, damageMulitplier };
export default FrostbiteTar20