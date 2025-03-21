import { storeAtom } from "../../atom/storeAtom";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../enemyTarget/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import { handleStatusEffects } from '../../gameData/Status';

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;


export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const characters = turnOrder.filter(e => !('target' in e)) as CharacterType[];
  const currentTurn = storeAtom.get(turnCountAtom); // Read current turn

  for (const entity of turnOrder) {

    handleStatusEffects(entity); 

    if ('target' in entity) {
      // Enemy turn
      const enemy = storeAtom.get(EnemyAtom)[entity.id];

      if (enemy.health <= 0) {
        console.log(`${enemy.name} died from status effects.`);
        continue; // Skip this enemy's attack
      }

      const targetName = getEnemyTargetName(enemy, characters.filter(c => !c.status.includes({ type: 'Dead', duration: Infinity })));
      const character = characters.find(c => c.name === targetName);


      if (!character || enemy.speed === 0) {
        console.warn(`No valid target found for ${enemy.name} Or enemy speed is 0`);
        continue;
      }

      const updatedHealth = basicEnemyAttack(character, enemy);
      character.health = updatedHealth;
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (updatedHealth <= 0 && !character.status.some(s => s.type === "Dead")) {
        character.status.push({ type: "Dead", duration: Infinity });
      }

      console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);

    } else {
      // Character turn
      const character = entity as CharacterType;

      if(character.health > 0) {
        storeAtom.set(playerTargetAtom, null);
        storeAtom.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, currentTurn: true }
        }));

        console.log(`Character ${character.name}'s turn. Waiting for user input...`);
        await waitForInput();
        
        const playerTarget = storeAtom.get(playerTargetAtom);
        const spell = storeAtom.get(selectedSpellAtom);
        console.log(`Using spell: ${spell}`);

        if (playerTarget && 'target' in playerTarget) {
          const updatedHealth = basicCharacterAttack(playerTarget, character, spell as string);
          playerTarget.health = updatedHealth;

          if (updatedHealth <= 0 && !playerTarget.status.some(s => s.type === "Dead")) {
            playerTarget.status.push({ type: "Dead", duration: Infinity });
          }

        } else {
          console.log(`%c${character.name} has no valid target.`, 'color: blue;');
        }

        // Mark current turn as complete for the character
        storeAtom.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, currentTurn: false }
        }));
      }
    }
  }
  
  console.log(`Turn ${storeAtom.get(turnCountAtom)} ended.`);
  storeAtom.set(turnCountAtom, currentTurn + 1);
};


const spellEffects: Record<string, (enemy: EnemyType, character: CharacterType, enemyOne?: EnemyType, enemyTwo?: EnemyType) => number> = {
  Fire_Ball: (enemy, character) => enemy.health - (character.attack + 10),
  Ice_Bolt: (enemy, character) => {
    enemy.status.push({ type: "Frozen", duration: 3 });
    enemy.speed = 0;
    return enemy.health - (character.attack + 5);
  },
  Lightning_Bolt: (enemy, character) => enemy.health - (character.attack + 15),
  Heal: (character) => {
    character.health += 20;
    return character.health;
  },

  Garrote: (enemy, character) => {
    enemy.status.push({ type: "Bleed", duration: 3, damage: 10 });
    return enemy.health - (character.attack + 5);
  },

  Multi_Shot: (enemy: EnemyType, character: CharacterType) => {
    const enemies = Object.values(storeAtom.get(EnemyAtom)); // Get all enemies as an array
    const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order); // Ensure correct order
  
    const enemyIndex = sortedEnemies.findIndex(e => e.id === enemy.id);
    
    if (enemyIndex === -1) {
      console.warn(`Enemy ${enemy.id} not found in sorted list.`);
      return enemy.health - (character.attack + 5);
    }
  
    // Get previous and next enemies if they exist
    const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
    const nextEnemy = enemyIndex < sortedEnemies.length - 1 ? sortedEnemies[enemyIndex + 1] : null;
  
    enemy.health -= character.attack + 5;
  
    if (prevEnemy) {
      prevEnemy.health -= character.attack + 5;
    }
  
    if (nextEnemy) {
      nextEnemy.health -= character.attack + 5;
    }
  
    return enemy.health; // Return updated health of main target
  }
  
};

const basicCharacterAttack = (enemy: EnemyType, character: CharacterType, spell: string) => {

  if (spellEffects[spell]) {
    return spellEffects[spell](enemy, character);
  } else {
    console.warn(`Unknown spell: ${spell}`);
    return enemy.health - character.attack; // Default attack
  }

};

const basicEnemyAttack = (character: CharacterType, enemy: EnemyType) => {
  return character.health - enemy.attack;
};