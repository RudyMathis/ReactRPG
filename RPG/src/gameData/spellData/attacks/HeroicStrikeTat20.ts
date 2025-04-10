import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";

import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const HeroicStrikeTar20 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 

    if(target === character) {
        spellCost = 20;
        enemy.mana += spellCost;

        return character.health - Math.max(5, character.attack - character.defense);
    } else {
        spellCost = 20;
        character.mana += spellCost;

        return enemy.health - Math.max(5, (character.attack + AdditionalBlessingDamage(character)) - enemy.defense);
    }
}

export default HeroicStrikeTar20