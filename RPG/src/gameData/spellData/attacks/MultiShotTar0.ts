import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";

const MultiShotTar0 = (
    enemy: EnemyType,
    character: CharacterType,
    target: CharacterType | EnemyType,
    spellCost: number
) => {
    spellCost = 0;
    const targetCharacter = 'id' in target && target.id === character.id && target.type === character.type

    if(targetCharacter) {
        enemy.mana -= spellCost;

        const characters = Object.values(storeAtom.get(CharacterAtom));
        const selectedCharacters = characters.filter(char => char.isSelected);
        const sortedCharacters = [...selectedCharacters].sort((a, b) => a.id - b.id);
        const characterIndex = sortedCharacters.findIndex(e => e.id === character.id);

        if (characterIndex === -1) {
            console.warn(`character ${character.id} not found in sorted list.`);
            return character.health;
        }

        const damage = Math.max(5, Math.round(enemy.attack) - character.defense);

        const prevCharacter = characterIndex > 0 ? sortedCharacters[characterIndex - 1] : null;
        const nextCharacter = characterIndex < sortedCharacters.length - 1 ? sortedCharacters[characterIndex + 1] : null;

        if (prevCharacter) {
            prevCharacter.health -= damage;
            HandleDamageEffect(damage, "Physical", "player", prevCharacter.id);
        }

        if (nextCharacter) {
            nextCharacter.health -= damage;
            HandleDamageEffect(damage, "Physical", "player", nextCharacter.id);
        }

        HandleDamageEffect(damage, "Physical", "player", character.id);
        return character.health -= damage;
    } else {
        character.mana -= spellCost;

        const enemies = Object.values(storeAtom.get(EnemyAtom));
        const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order);
        const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);

        if (enemyIndex === -1) {
            console.warn(`Enemy ${enemy.id} not found in sorted list.`);
            return enemy.health;
        }

        const damage = Math.max(5, Math.round(character.attack + AdditionalBlessingDamage(character)) - enemy.defense);

        const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
        const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

        if (prevEnemy) {
            prevEnemy.health -= damage;
            HandleDamageEffect(damage, "Physical", "npc", prevEnemy.id);
        }

        if (nextEnemy) {
            nextEnemy.health -= damage;
            HandleDamageEffect(damage, "Physical", "npc", nextEnemy.id);
        }

        HandleDamageEffect(damage, "Physical", "npc", enemy.id);
        return enemy.health -= damage;
    }
};

export default MultiShotTar0;