import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus } from "../../AdditionalBlessingDamage";

const spellCost = 40;
const damageMulitplier = 1.25;
const LightningBoltTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const damage = Math.round(enemy.attack * damageMulitplier)
        const lightningResistance = character.resistances.find(res => res.type ===  Resistances.Lightning.type);
        const lightningVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Lightning.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Lightning.value)
        character.mana = Math.round(character.mana / 2);
        
        if (lightningResistance) {
            HandleDamageEffect(damageResistance, "Lightning", "player", character.id);
            return character.health -= damageResistance;
        } else if (lightningVulnerability) {
            HandleDamageEffect(damageVulnerability, "Lightning", "player", character.id);
            return character.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Lightning", "player", character.id);
            return character.health -= damage;
        }
    } else {
        character.mana -= spellCost;

        const damage = Math.round(character.attack * damageMulitplier)
        const lightningResistance = enemy.resistances.find(res => res.type ===  Resistances.Lightning.type);
        const lightningVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Lightning.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Lightning.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Lightning.value)
        enemy.mana = Math.round(enemy.mana / 2);

        BlessingOfBurnBonus(character, enemy);

        if (lightningResistance) {
            HandleDamageEffect(damageResistance, "Lightning", "npc", enemy.id);
            return enemy.health -= damageResistance;
        } else if (lightningVulnerability) {
            HandleDamageEffect(damageVulnerability, "Lightning", "npc", enemy.id);
            return enemy.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Lightning", "npc", enemy.id);
            return enemy.health -= damage;
        }
    }
}

export { spellCost, damageMulitplier };
export default LightningBoltTar40