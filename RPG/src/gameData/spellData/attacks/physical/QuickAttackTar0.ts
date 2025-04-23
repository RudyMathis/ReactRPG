import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";

import { AdditionalBlessingDamage } from "../../AdditionalBlessingDamage";

const QuickAttackTar0 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        spellCost = 0;
        enemy.mana += spellCost;
        const damage =  Math.max(5, Math.round(enemy.attack - character.defense))
        HandleDamageEffect(damage, "Physical", "player", character.id);

        return character.health - damage;
    } else {
        spellCost = 0;
        character.mana += spellCost;
        const damage =  Math.max(5, Math.round(character.attack - enemy.defense))

        HandleDamageEffect(damage + AdditionalBlessingDamage(character), "Phyical", "npc", enemy.id);
        return enemy.health - (damage + AdditionalBlessingDamage(character));
    }
}

export default QuickAttackTar0