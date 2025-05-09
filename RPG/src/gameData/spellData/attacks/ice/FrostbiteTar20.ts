import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const FrostbiteTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        spellCost = 20;
        enemy.mana -= spellCost;
    
        const iceResistance = character.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = character.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Ice.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Ice.value)
        const damage = enemy.attack
        
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
        spellCost = 20;
        character.mana -= spellCost;
    
        const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Ice.value))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Ice.value)
        const damage = Math.round(character.attack * 1.1)

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

export default FrostbiteTar20