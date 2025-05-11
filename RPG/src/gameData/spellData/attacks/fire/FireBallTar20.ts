import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import Resistances from "../../../Resistances";
import Vulnerabilites from "../../../Vulnerabilities";

const spellCost = 20;
const damageMulitplier = 1;

const FireBallTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const damage = Math.max(5, Math.round(enemy.attack));
        const fireResistance = character.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = character.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.name);
        const damageResistance = Math.max(1, Math.round(damage - Resistances.Fire.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Fire.value)

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
        
        const damage = Math.max(5, Math.round(character.attack))
        const fireResistance = enemy.resistances.find(res => res.type ===  Resistances.Fire.type);
        const fireVulnerability = enemy.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.name);
        const damageResistance = Math.max(5, Math.round(damage - Resistances.Fire.value))
        const damageVulnerability = Math.round(damage + Vulnerabilites.Fire.value)

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

export { spellCost, damageMulitplier };
export default FireBallTar20