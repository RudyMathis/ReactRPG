import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";
import { AdditionalBlessingDamage } from "../../AdditionalBlessingDamage";

const GarroteTar40 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        spellCost = 40;
        enemy.mana -= spellCost;
        const bleedDamage = Math.max(5, Math.round(enemy.attack - character.defense));

        if (character.debuffs.find(d => d.type === Debuffs.Bleed.type)) {
            HandleDamageEffect(bleedDamage, "Physical", "player", character.id);
            return character.health - bleedDamage;
        } else {
            character.debuffs.push({
                type: Debuffs.Bleed.type, duration: 3,
                name: Debuffs.Bleed.name
            });
            HandleDamageEffect(bleedDamage, "Physical", "player", character.id);
            return character.health - bleedDamage;
        }
    } else {
        spellCost = 40;
        character.mana -= spellCost;
        const bleedDamage = Math.max(5, Math.round(character.attack - enemy.defense) + AdditionalBlessingDamage(character));

        if(enemy.debuffs.find(d => d.type === Debuffs.Bleed.type)) {
            HandleDamageEffect(bleedDamage, "Physical", "npc", enemy.id);
            return enemy.health - bleedDamage;
        } else {
            enemy.debuffs.push({
                type: Debuffs.Bleed.type, duration: 3,
                name: Debuffs.Bleed.name
            });
            HandleDamageEffect(bleedDamage, "Physical", "npc", enemy.id);
            return enemy.health - bleedDamage;
        }
    }
}

export default GarroteTar40