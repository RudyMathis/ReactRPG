import { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../../atom/CharacterAtom";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import { BlessingOfBurnBonus, BlessingOfLightningBonus } from "../../AdditionalBlessingDamage";

const spellCost = 50;
const damageMulitplier = 2;
const AimShotTar50 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType) =>{ 
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const damage =  Math.max(20, Math.round((enemy.attack * damageMulitplier) - character.defense))
        HandleDamageEffect(damage, "Physical", "player", character.id);

        return character.health - damage;
    } else {
        character.mana -= spellCost;

        const damage =  Math.max(20, Math.round((character.attack * damageMulitplier) - enemy.defense))

        HandleDamageEffect(damage, "Phyical", "npc", enemy.id);
        BlessingOfBurnBonus(character, enemy);
        BlessingOfLightningBonus(character, enemy);
        return enemy.health - damage;
    }
}

export { spellCost, damageMulitplier };
export default AimShotTar50