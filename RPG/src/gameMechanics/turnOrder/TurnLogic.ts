import { getDefaultStore } from 'jotai';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../enemyTarget/EnemyTargetLogic';

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

const store = getDefaultStore(); // <--- This lets us read atom values outside React components

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const characters = turnOrder.filter(e => !('target' in e)) as CharacterType[];

  for (const entity of turnOrder) {
    if ('target' in entity) {
      // Enemy turn
      const enemy = entity as EnemyType;
      const targetName = getEnemyTargetName(enemy, characters.filter(c => !c.status.includes('Dead')));
      const character = characters.find(c => c.name === targetName);

      if (!character) {
        console.warn(`No valid target found for ${enemy.name}`);
        continue;
      }

      const updatedHealth = basicEnemyAttack(character, enemy);
      character.health = updatedHealth;

      // Update character state for health and status
      store.set(CharacterAtom, prev => ({
        ...prev,
        [character.id]: { ...character, health: updatedHealth, status: character.health <= 0 ? ['Dead'] : character.status }
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (character.health <= 0) {
        character.status.push('Dead');
      }

    } else {
      // Character turn
      const character = entity as CharacterType;

      if(character.health > 0) {
        // Mark current turn for the character
        store.set(playerTargetAtom, null);
        store.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, currentTurn: true }
        }));

        console.log(`Character ${character.name}'s turn. Waiting for user input...`);
        await waitForInput();

        const playerTarget = store.get(playerTargetAtom);

        if (playerTarget && 'target' in playerTarget) {
          const updatedHealth = basicCharacterAttack(playerTarget, character);
          playerTarget.health = updatedHealth;

          // Update enemy state for health and status
          store.set(EnemyAtom, prev => ({
            ...prev,
            [playerTarget.id]: { 
              ...playerTarget, 
              health: updatedHealth,  
              status: playerTarget.health <= 0 ? ['Dead'] : playerTarget.status }
          }));

          if (playerTarget.health <= 0) {
            playerTarget.status.push('Dead');
          }

        } else {
          console.log(`%c${character.name} has no valid target.`, 'color: blue;');
        }

        // Mark current turn as complete for the character
        store.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, currentTurn: false }
        }));

      }
    }
  }

  console.log('Turn cycle complete.');
};


const basicCharacterAttack = (enemy: EnemyType, character: CharacterType) => {
  return enemy.health - character.attack;
};

const basicEnemyAttack = (character: CharacterType, enemy: EnemyType) => {
  return character.health - enemy.attack;
};