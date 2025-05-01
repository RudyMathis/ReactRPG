import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import Debuffs from "../../../Debuffs";
import { BlessingOfBurnBonus, BlessingOfHolyDamageBonus } from "../../AdditionalBlessingDamage";

const DevastateTar60 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if (targetCharacter) {
        spellCost = 60;
        enemy.mana -= spellCost;
        if (character.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
            return character.health - Math.max(5, enemy.attack - character.defense);
        } else {
            character.debuffs.push({
                type: Debuffs.Sundered.type, 
                duration: 3,
                damage: 0,
                name: Debuffs.Sundered.name
            });

            character.defense = 0;
            return character.health - Math.max(5, character.attack - character.defense);
        }
    } else {

        spellCost = 60;
        character.mana -= spellCost;

        if(enemy.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
            BlessingOfBurnBonus(character, enemy);
            BlessingOfHolyDamageBonus(character, enemy);
            return enemy.health - Math.max(5, (character.attack - enemy.defense));
        } else {
            enemy.debuffs.push({
                type: Debuffs.Sundered.type, 
                duration: 3,
                name: Debuffs.Sundered.name
            });
            
            enemy.defense = 0;
            BlessingOfBurnBonus(character, enemy);
            BlessingOfHolyDamageBonus(character, enemy);
            return enemy.health - Math.max(5, (character.attack - enemy.defense));
        }
    }
}

export default DevastateTar60