import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = 40;
const damageMulitplier = 2;

const HolyStrikeTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const damage = Math.round(enemy.attack * damageMulitplier);
        const holyResistance = character.resistances.find(res => res.type ===  Resistances.Holy.type);
        const holyVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Holy.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Holy.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Holy.value)
        
        if (holyResistance) {
            HandleDamageEffect(damageResistance, "Holy", "player", character.id);
            return character.health -= damageResistance;
        } else if (holyVulnerability) {
            HandleDamageEffect(damageVulnerability, "Holy", "player", character.id);
            return character.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Holy", "player", character.id);
            return character.health -= damage;
        }
    } else {
        character.mana -= spellCost;

        const damage = Math.round(character.attack * damageMulitplier);
        const holyResistance = enemy.resistances.find(res => res.type ===  Resistances.Holy.type);
        const holyVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Holy.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Holy.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Holy.value)

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);

        if (holyResistance) {
            HandleDamageEffect(damageResistance, "Holy", "npc", enemy.id);
            return enemy.health -= damageResistance;
        } else if (holyVulnerability) {
            HandleDamageEffect(damageVulnerability, "Holy", "npc", enemy.id);
            return enemy.health -= damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Holy", "npc", enemy.id);
            return enemy.health -= damage;
        }
    }
}

export { spellCost, damageMulitplier };
export default HolyStrikeTar40