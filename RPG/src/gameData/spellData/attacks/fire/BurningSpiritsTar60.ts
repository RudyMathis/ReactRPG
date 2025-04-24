import EnemyAtom, { EnemyType } from "../../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../../atom/CharacterAtom";
import { storeAtom } from "../../../../atom/storeAtom";
import { AdditionalBlessingDamage } from "../../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../../Debuffs";

const BurningSpritsTar60 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 60;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);

        selectedCharacters.forEach(targetChar => {
            targetChar.debuffs.push({
                type: Debuffs.Burn.type, duration: 3,
                name: Debuffs.Burn.name,
                icon: Debuffs.Burn.icon
            });
            const resistance = targetChar.resistances.find(res => res.type === "Fire")?.value || 0;
            const vulnerability = targetChar.vulnerabilities.find(vul => vul.type === "Fire")?.value || 0;

            let damage = Math.round(enemy.attack * .9);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(enemy.attack - resistance));
            } else if (vulnerability > 0) {
                damage = Math.round(enemy.attack + vulnerability);
            }

            targetChar.health -= damage;
            HandleDamageEffect(damage, "Fire", "player", targetChar.id);
        });

        return character.health;
    } else {
        character.mana -= spellCost;
        const enemies = Object.values(storeAtom.get(EnemyAtom));
    
        enemies.forEach(targetEnemy => {
            targetEnemy.debuffs.push({
                type: Debuffs.Burn.type, duration: 2,
                name: Debuffs.Burn.name,
                icon: Debuffs.Burn.icon
            });
            const resistance = targetEnemy.resistances.find(res => res.type === "Fire")?.value || 0;
            const vulnerability = targetEnemy.vulnerabilities.find(vul => vul.type === "Fire")?.value || 0;

            let damage = Math.round(character.attack * .9) + AdditionalBlessingDamage(character);

            if (resistance > 0) {
                damage = Math.max(10, Math.round(character.attack - resistance)) + AdditionalBlessingDamage(character);
            } else if (vulnerability > 0) {
                damage = Math.round(character.attack + vulnerability) + AdditionalBlessingDamage(character);
            }

            targetEnemy.health -= damage;
            HandleDamageEffect(damage, "Fire", "npc", targetEnemy.id);
        });

        return enemy.health;
    }
};

export default BurningSpritsTar60;