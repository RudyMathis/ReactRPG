import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const HolyStrikeTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    spellCost = 40;

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const holyResistance = character.resistances.find(res => res.type ===  Resistances.Holy.type);
        const holyVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Holy.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Holy.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Holy.value)
        const damage = Math.round(enemy.attack * 2)
        
        if (holyResistance) {
            HandleDamageEffect(damageResistance, "Holy", "player", character.id);
            return character.health - damageResistance;
        } else if (holyVulnerability) {
            HandleDamageEffect(damageVulnerability, "Holy", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Holy", "player", character.id);
            return character.health - damage;
        }
    } else {
        character.mana -= spellCost;

        const holyResistance = enemy.resistances.find(res => res.type ===  Resistances.Holy.type);
        const holyVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Holy.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Holy.value))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Holy.value)
        const damage = Math.round(character.attack * 2)

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);

        if (holyResistance) {
            HandleDamageEffect(damageResistance, "Holy", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (holyVulnerability) {
            HandleDamageEffect(damageVulnerability, "Holy", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(damage, "Holy", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export default HolyStrikeTar40