import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../..//../gameMechanics/HandleDamageEffect";
import Resistances from "../..//../Resistances";
import Vulnerabilites from "../..//../Vulnerabilities";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const ShadowDaggerTar30 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    spellCost = 30;

    if(targetCharacter) {
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
        character.mana -= spellCost;

        const darkResistance = enemy.resistances.find(res => res.type ===  Resistances.Dark.type);
        const darkVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Dark.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Dark.value))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Dark.value)
        const damage = Math.round(character.attack * 1.25)

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);

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

export default ShadowDaggerTar30