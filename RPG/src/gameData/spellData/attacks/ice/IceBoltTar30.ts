import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";
import { AdditionalBlessingDamage } from "../../AdditionalBlessingDamage";

const IceBoltTar30 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    // UPDATE TO ONLY BE FROZEN ONCE WHILE NOT FROZEN

    if(targetCharacter) {
        character.debuffs.push({
            type: Debuffs.Frozen.type, 
            duration: 3,
            damage: 0,
            name: Debuffs.Frozen.name,
            icon: Debuffs.Frozen.icon
        });
        character.speed = 0;
        spellCost = 30;
        enemy.mana -= spellCost;

        const iceResistance = character.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = character.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Ice.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Ice.value)
        
        if(iceResistance) {
            HandleDamageEffect(damageResistance, "Ice", "player", character.id);
            return character.health - damageResistance;
        } else if (iceVulnerability) {
            HandleDamageEffect(damageVulnerability, "Ice", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(enemy.attack, "Ice", "player", character.id);
            return character.health - enemy.attack;
        }
    } else {
        enemy.debuffs.push({
            type: Debuffs.Frozen.type, 
            duration: 3,
            name: Debuffs.Frozen.name,
            icon: Debuffs.Frozen.icon
        });
        enemy.speed = 0;
        spellCost = 30;
        character.mana -= spellCost;

        const iceResistance = enemy.resistances.find(resistance => resistance.type === Resistances.Ice.type);
        const iceVulnerability = enemy.vulnerabilities.find(vulnerability => vulnerability.type === Vulnerabilites.Ice.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Ice.value) + AdditionalBlessingDamage(character))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Ice.value) + AdditionalBlessingDamage(character)
        const damage = Math.round(character.attack * 1.1) + AdditionalBlessingDamage(character)
        
        if(iceResistance) {
            HandleDamageEffect(damageResistance, "Ice", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (iceVulnerability) {
            HandleDamageEffect(damageVulnerability, "Ice", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(character.attack, "Ice", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export default IceBoltTar30