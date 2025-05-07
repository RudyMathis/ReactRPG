import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";

const FireBallTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type
    spellCost = 20;

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const fireResistance = character.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
        const damageResistance = Math.max(1, Math.round(enemy.attack - Resistances.Fire.value))
        const damageVulnerability = Math.round(enemy.attack + Vulnerabilites.Fire.value)
        const damage = Math.max(5, Math.round(enemy.attack))

        character.debuffs.push({
            type: Debuffs.Burn.type, 
            duration: 3,
            damage: Debuffs.Burn.damage,
            name: Debuffs.Burn.name,
            icon: Debuffs.Burn.icon
        });
        
        if (fireResistance) {
            HandleDamageEffect(damageResistance, "Fire", "player", character.id);
            return character.health - damageResistance;
        } else if (fireVulnerability) {
            HandleDamageEffect(damageVulnerability, "Fire", "player", character.id);
            return character.health - damageVulnerability;
        } else {
            HandleDamageEffect(enemy.attack, "Fire", "player", character.id);
            return character.health - damage;
        }
        
    } else {
        enemy.debuffs.push({
            type: Debuffs.Burn.type, 
            duration: 3,
            damage: Debuffs.Burn.damage,
            name: Debuffs.Burn.name,
            icon: Debuffs.Burn.icon
        });
        character.mana -= spellCost;
        
        const fireResistance = enemy.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type);
        const damageResistance = Math.max(1, Math.round(character.attack - Resistances.Fire.value))
        const damageVulnerability = Math.round(character.attack + Vulnerabilites.Fire.value)
        const damage = Math.max(5, Math.round(character.attack))

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