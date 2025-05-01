import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { BlessingOfBurnBonus, BlessingOfHolyDamageBonus } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";

const VolleyTar20 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 20;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);

        selectedCharacters.forEach(targetChar => {
            const damage = Math.max(5, Math.round(enemy.attack) - targetChar.defense);
            targetChar.health -= damage;
            HandleDamageEffect(damage, "Physical", "player", targetChar.id);
        });

        return character.health;
    } else {
        character.mana -= spellCost;

        const enemies = Object.values(storeAtom.get(EnemyAtom));
    
        enemies.forEach(targetEnemy => {
            const damage = Math.max(5, Math.round(character.attack - targetEnemy.defense));
            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Physical", "npc", targetEnemy.id);
            BlessingOfBurnBonus(character, targetEnemy);
            BlessingOfHolyDamageBonus(character, targetEnemy);
        });

        return enemy.health;
    }
};

export default VolleyTar20;
