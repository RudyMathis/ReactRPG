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
      const targetName = getEnemyTargetName(enemy, characters);
      const character = characters.find(c => c.name === targetName);

      if (!character) {
        console.warn(`No valid target found for ${enemy.name}`);
        continue;
      }
      
      const updatedHealth = basicEnemyAttack(character, enemy);
      if (character.health <= 0) {
        store.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, health: 0 }
        }));
  
        await new Promise(resolve => setTimeout(resolve, 1000));
        character.health = 0;
        character.status = ['Dead'];
        character.selected = false;
      } else {

        store.set(CharacterAtom, prev => ({
          ...prev,
          [character.id]: { ...character, health: updatedHealth }
        }));
  
        await new Promise(resolve => setTimeout(resolve, 1000));
        character.health = updatedHealth;
      }


    } else {
      // Character turn
      const character = entity as CharacterType;

      if(character.health > 0) {

      console.log(`Character ${character.name}'s turn. Waiting for user input...`);
      await waitForInput();

      const playerTarget = store.get(playerTargetAtom);
      if (playerTarget && 'target' in playerTarget) {
        const updatedHealth = basicCharacterAttack(playerTarget, character);
        
        store.set(EnemyAtom, prev => ({
          ...prev,
          [playerTarget.id]: { ...playerTarget, health: updatedHealth }
        }));

        playerTarget.health = updatedHealth;
      } else {
        console.log(`%c${character.name} has no valid target.`, 'color: blue;');
      }
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
