import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";

import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const HeroicStrikeTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 

    if(target === character) {
        spellCost = 20;
        enemy.mana += spellCost;
        const damage =  Math.max(5, Math.round(enemy.attack - character.defense))
        HandleDamageEffect(damage, "Physical", "player", character.id);

        return character.health - damage;
    } else {
        spellCost = 20;
        character.mana += spellCost;
        const damage =  Math.max(5, Math.round(character.attack - enemy.defense))

        HandleDamageEffect(damage + AdditionalBlessingDamage(character), "Phyical", "npc", enemy.id);
        return enemy.health - (damage + AdditionalBlessingDamage(character));
    }
}

export default HeroicStrikeTar20