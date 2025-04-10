import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../Resistances";
import Vulnerabilites from "../../Vulnerabilities";
import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const LightningBoltTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    if(target === character) {
        spellCost = 40;
        enemy.mana -= spellCost;

        const lightningResistance = character.resistances.find(res => res.type ===  Resistances.Lightning.type);
        const lightningVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Lightning.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Lightning.value)
        const damage = Math.round(enemy.attack * 1.25)
        
        if (lightningResistance) {
            HandleDamageEffect(damageResistance, "Lightning", "player", character.id);
            return character.health - damageResistance;
        } else if (lightningVulnerability) {
            HandleDamageEffect(damageVulnerability, "Lightning", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Lightning", "player", character.id);
            return character.health - damage;
        }
    } else {
        const spellCost = 40;
        character.mana -= spellCost;

        const lightningResistance = enemy.resistances.find(res => res.type ===  Resistances.Lightning.type);
        const lightningVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Lightning.value) + AdditionalBlessingDamage(character))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Lightning.value) + AdditionalBlessingDamage(character)
        const damage = Math.round(character.attack * 1.25) + AdditionalBlessingDamage(character)

        if (lightningResistance) {
            HandleDamageEffect(damageResistance, "Lightning", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (lightningVulnerability) {
            HandleDamageEffect(damageVulnerability, "Lightning", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Lightning", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export default LightningBoltTar40