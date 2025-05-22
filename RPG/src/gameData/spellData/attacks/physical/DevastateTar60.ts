import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import Debuffs from "../../../Debuffs";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = 60;
const damageMulitplier = 1;
const DevastateTar60 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if (targetCharacter) {
        enemy.mana -= spellCost;
        const damage = Math.max(5, ((enemy.attack * damageMulitplier) - character.defense));

        if (!character.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
            character.debuffs.push({
                type: Debuffs.Sundered.type, 
                duration: 3,
                damage: 0,
                name: Debuffs.Sundered.name,
                icon: Debuffs.Sundered.icon
            });
            character.defense = 0;
        } else {
            character.debuffs.fill({
                type: Debuffs.Sundered.type, 
                duration: 3,
                damage: 0,
                name: Debuffs.Sundered.name,
                icon: Debuffs.Sundered.icon
            });
        }

        return character.health -= damage;
    } else {
        character.mana -= spellCost;
        const damage = Math.max(5, ((character.attack * damageMulitplier) - enemy.defense));

        if(!enemy.debuffs.find(d => d.type === Debuffs.Sundered.type)) {
            enemy.debuffs.push({
                type: Debuffs.Sundered.type, 
                duration: 3,
                damage: 0,
                name: Debuffs.Sundered.name,
                icon: Debuffs.Sundered.icon
            });
            enemy.defense = 0;

        } else {
            enemy.debuffs.fill({
                type: Debuffs.Sundered.type, 
                duration: 3,
                damage: 0,
                name: Debuffs.Sundered.name,
                icon: Debuffs.Sundered.icon
            });           
        }

        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        return enemy.health -= damage;
    }
}

export { spellCost, damageMulitplier };
export default DevastateTar60