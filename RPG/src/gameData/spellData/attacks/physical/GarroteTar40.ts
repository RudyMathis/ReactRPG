import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = 40;
const damageMulitplier = 1;
const GarroteTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;
        const damage = Math.max(5, Math.round((enemy.attack * damageMulitplier) - character.defense));

        if (character.debuffs.find(d => d.name === Debuffs.Bleed.name)) {
            HandleDamageEffect(damage, "Physical", "player", character.id);
            return character.health - damage;
        } else {
            character.debuffs.push({
                type: Debuffs.Bleed.type,
                duration: 3,
                damage: 10,
                name: Debuffs.Bleed.name,
                icon: Debuffs.Bleed.icon
            });
            HandleDamageEffect(damage, "Physical", "player", character.id);
            return character.health - damage;
        }
    } else {
        character.mana -= spellCost;
        const damage = Math.max(5, Math.round((character.attack * damageMulitplier) - enemy.defense));

        if(enemy.debuffs.find(d => d.type === Debuffs.Bleed.type)) {
            HandleDamageEffect(damage, "Physical", "npc", enemy.id);
            BlessingOfBurnBonus(character, enemy);
            BlessingOfLightningBonus(character, enemy);
            return enemy.health - damage;
        } else {
            enemy.debuffs.push({
                type: Debuffs.Bleed.type, duration: 3,
                name: Debuffs.Bleed.name,
                icon: Debuffs.Bleed.icon
            });
            HandleDamageEffect(damage, "Physical", "npc", enemy.id);
            BlessingOfBurnBonus(character, enemy);
            BlessingOfLightningBonus(character, enemy);
            return enemy.health - damage;
        }
    }
}

export { spellCost, damageMulitplier };
export default GarroteTar40