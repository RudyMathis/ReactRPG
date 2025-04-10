import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../Resistances";
import Vulnerabilites from "../../Vulnerabilities";
import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const ShadowStrikeTar0 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    if(target === character) {
        spellCost = 0;
        enemy.mana -= spellCost;

        const darkResistance = character.resistances.find(res => res.type ===  Resistances.Dark.type);
        const darkVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Dark.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Dark.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Dark.value)
        const damage = Math.round(enemy.attack * 1.25)
        
        if (darkResistance) {
            HandleDamageEffect(damageResistance, "Dark", "player", character.id);
            return character.health - damageResistance;
        } else if (darkVulnerability) {
            HandleDamageEffect(damageVulnerability, "Dark", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Dark", "player", character.id);
            return character.health - damage;
        }
    } else {
        const spellCost = 0;
        character.mana -= spellCost;

        const darkResistance = enemy.resistances.find(res => res.type ===  Resistances.Dark.type);
        const darkVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Dark.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Dark.value) + AdditionalBlessingDamage(character))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Dark.value) + AdditionalBlessingDamage(character)
        const damage = Math.round(character.attack * 1.25) + AdditionalBlessingDamage(character)

        if (darkResistance) {
            HandleDamageEffect(damageResistance, "Dark", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (darkVulnerability) {
            HandleDamageEffect(damageVulnerability, "Dark", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Dark", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export default ShadowStrikeTar0