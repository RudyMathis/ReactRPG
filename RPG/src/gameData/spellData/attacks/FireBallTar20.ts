import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";
import Resistances from "../../Resistances";
import Vulnerabilites from "../../Vulnerabilities";
import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const FireBallTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    if(target === character) {
        character.debuffs.push({
            type: Debuffs.Burn.type, duration: 3,
            name: Debuffs.Burn.name
        });
        spellCost = 20;
        enemy.mana -= spellCost;

        const fireResistance = character.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Fire.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Fire.value)
        
        if (fireResistance) {
            HandleDamageEffect(damageResistance, "Fire", "player", character.id);
            return character.health - damageResistance;
        } else if (fireVulnerability) {
            HandleDamageEffect(damageVulnerability, "Fire", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(enemy.attack, "Fire", "player", character.id);
            return character.health - enemy.attack;
        }
    } else {
        enemy.debuffs.push({
            type: Debuffs.Burn.type, duration: 3,
            name: Debuffs.Burn.name
        });
        const spellCost = 20;
        character.mana -= spellCost;

        const fireResistance = enemy.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Fire.value) + AdditionalBlessingDamage(character))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Fire.value) + AdditionalBlessingDamage(character)
        const damage = character.attack + AdditionalBlessingDamage(character);

        if (fireResistance) {
            HandleDamageEffect(damageResistance, "Fire", "npc", enemy.id);
            return enemy.health - damageResistance;
        } else if (fireVulnerability) {
            HandleDamageEffect(damageVulnerability, "Fire", "npc", enemy.id);
            return enemy.health - damageVulnerability;
        } else {
            HandleDamageEffect(character.attack, "Fire", "npc", enemy.id);
            return enemy.health - damage;
        }
    }
}

export default FireBallTar20