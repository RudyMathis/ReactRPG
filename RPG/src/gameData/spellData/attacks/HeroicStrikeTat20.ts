import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";

import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const HeroicStrikeTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        spellCost = 20;
        enemy.mana += spellCost;
        const damage =  Math.max(5, Math.round(enemy.attack - character.defense))
        HandleDamageEffect(damage, "Physical", "player", character.id);
        console.log("target", target);
        return character.health - damage;
    } else {
        spellCost = 20;
        character.mana += spellCost;
        const damage =  Math.max(5, Math.round(character.attack - enemy.defense))
        console.log("target", target, "b");
        HandleDamageEffect(damage + AdditionalBlessingDamage(character), "Phyical", "npc", enemy.id);
        return enemy.health - (damage + AdditionalBlessingDamage(character));
    }
}

export default HeroicStrikeTar20