import { storeAtom } from "../../atom/storeAtom";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../enemyTarget/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import { handleStatusEffects } from '../../gameData/Status';
import { basicCharacterAttack, basicCharacterBuff, basicEnemyAttack } from '../../gameData/Spells';

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;


export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const characters = turnOrder.filter(e => !('target' in e)) as CharacterType[];
  const enemies = turnOrder.filter(e => 'target' in e) as EnemyType[];
  const currentTurn = storeAtom.get(turnCountAtom); // Read current turn

  // Check if the game should end
  const allCharactersDead = characters.every(c => c.health <= 0);
  const allEnemiesDead = enemies.every(e => e.health <= 0);
  
  if (allCharactersDead || allEnemiesDead) {
    console.log(`Game Over. ${allCharactersDead ? "Enemies Win!" : "Players Win!"}`);
    return; // Stop running turns
  }

  for (const entity of turnOrder) {
    handleStatusEffects(entity); 

    if ('target' in entity) {
      // Enemy turn
      const enemy = storeAtom.get(EnemyAtom)[entity.id];

      if (enemy.health <= 0) {
        console.log(`${enemy.name} died from status effects.`);
        continue; // Skip dead enemies
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const targetName = getEnemyTargetName(enemy, characters.filter(c => c.health > 0));
      const character = characters.find(c => c.name === targetName);

      if (!character || enemy.speed === 0) {
        console.warn(`No valid target found for ${enemy.name} or enemy speed is 0`);
        continue;
      }

      const updatedHealth = basicEnemyAttack(character, enemy);
      character.health = updatedHealth;

      if (updatedHealth <= 0 && !character.status.some(s => s.type === "Dead")) {
        character.status.push({ type: "Dead", duration: Infinity });
      }

      storeAtom.set(CharacterAtom, (prev) => ({
        ...prev,
        [character.id]: {
          ...prev[character.id],
          health: updatedHealth, 
        },
      }));

      console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);
    } else {
      // Character turn
      const character = entity as CharacterType;

      if (character.health <= 0) {
        console.log(`${character.name} is dead.`);
        continue;
      } 

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

        storeAtom.set(EnemyAtom, (prev) => ({
          ...prev,
          [playerTarget.id]: {
            ...prev[playerTarget.id],
            health: updatedHealth,
          },
        }));

      } else {
        
        if(playerTarget !== null) {

          if(playerTarget.id === character.id) {
            const updatedHealth = basicCharacterBuff(character, spell as string);
            character.health = updatedHealth;
  
            storeAtom.set(CharacterAtom, (prev) => ({
              ...prev,
              [character.id]: {
                ...prev[character.id],
                health: updatedHealth
              },
            }));

          } else {
            const updatedHealth = basicCharacterBuff(playerTarget, spell as string);
            playerTarget.health = updatedHealth;
            
            storeAtom.set(CharacterAtom, (prev) => ({
              ...prev,
              [playerTarget.id]: {
                ...prev[playerTarget.id],
                health: updatedHealth
              },
            }));
          }
        }
      }
      // Mark current turn as complete for the character
      storeAtom.set(CharacterAtom, prev => ({
        ...prev,
        [character.id]: { ...character, currentTurn: false }
      }));
    }
  }

  console.log(`Turn ${currentTurn} ended.`);
  storeAtom.set(turnCountAtom, currentTurn + 1);

  // Auto-start next round if the game is still active
  setTimeout(() => runTurnLogic(turnOrder, waitForInput), 1000);
};