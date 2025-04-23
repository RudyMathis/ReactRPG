import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { AdditionalBlessingDamage } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";

const HolyExplosionTar50 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 50;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);

        selectedCharacters.forEach(targetChar => {
            const resistance = targetChar.resistances.find(res => res.type === "Holy")?.value || 0;
            const vulnerability = targetChar.vulnerabilities.find(vul => vul.type === "Holy")?.value || 0;

            let damage = Math.round(enemy.attack * 0.9);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(enemy.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(enemy.attack + vulnerability);
            }

            targetChar.health -= damage;
            HandleDamageEffect(damage, "Holy", "player", targetChar.id);
        });

        return character.health;
    } else {
        character.mana -= spellCost;
        const enemies = Object.values(storeAtom.get(EnemyAtom));
    
        enemies.forEach(targetEnemy => {
            const resistance = targetEnemy.resistances.find(res => res.type === "Holy")?.value || 0;
            const vulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === "Holy")?.value || 0;

            let damage = Math.round(character.attack * 0.9) + AdditionalBlessingDamage(character);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(character.attack - resistance)) + AdditionalBlessingDamage(character);
            } else if (vulnerability > 0) {
                damage = Math.round(character.attack + vulnerability) + AdditionalBlessingDamage(character);
            }

            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Holy", "npc", targetEnemy.id);
        });

        return enemy.health;
    }
};

export default HolyExplosionTar50;

