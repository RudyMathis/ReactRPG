import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const ShootTar0 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        spellCost = 0;
        enemy.mana -= spellCost;

        const damage =  Math.max(10, Math.round(enemy.attack - character.defense))
        HandleDamageEffect(damage, "Physical", "player", character.id);

        return character.health - damage;
    } else {
        spellCost = 0;
        character.mana -= spellCost;

        const damage =  Math.max(10, Math.round(character.attack - enemy.defense))

        HandleDamageEffect(damage, "Phyical", "npc", enemy.id);
        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        return enemy.health - damage;
    }
}

export default ShootTar0