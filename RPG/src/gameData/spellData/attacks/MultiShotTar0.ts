import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { AdditionalBlessingDamage } from "../AdditionalBlessingDamage";

const MultiShotTar0 = (enemy: EnemyType, character: CharacterType, target: CharacterType | EnemyType, spellCost: number) =>{ 
    // Update to allow for enemy to use
    const enemies = Object.values(storeAtom.get(EnemyAtom)); // Get all enemies as an array
    const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order); // Ensure correct order

    const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
    spellCost = 0;
    character.mana -= spellCost;
    const damage = ((character.attack + AdditionalBlessingDamage(character)) - Math.max(5, enemy.defense))
    
    if (enemyIndex === -1) {
        console.warn(`Enemy ${enemy.id} not found in sorted list.`);
        return enemy.health - damage;
    }

    // Get previous and next enemies if they exist
    const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
    const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;

    enemy.health -= damage;

    if (prevEnemy) {
        prevEnemy.health -= damage;
    }

    if (nextEnemy) {
        nextEnemy.health -= damage;
    }
    console.log("multi shot target", target)
    return enemy.health; // Return updated health of main target
}

export default MultiShotTar0