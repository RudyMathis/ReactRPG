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

      console.log(`%cEnemy ${entity.name} takes its turn.`, 'color: red; font-weight: bold;');
      const damage = enemy.attack;
      
      console.log(`%cEnemy ${entity.name} attacks ${character.name} and deals ${damage} damage!`, 'color: red;');
      console.log(`${character.name}'s health has been reduced to ${basicAttack(character, enemy)}`);

      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      // Character turn
      const character = entity as CharacterType;
      console.log(`Character ${character.name}'s turn. Waiting for user input...`);
      await waitForInput();

      const playerTarget = store.get(playerTargetAtom);

      if (playerTarget) {
        console.log(`%c${entity.name} attacks ${playerTarget.name} for 10 damage!`, 'color: blue;');
      } else {
        console.log(`%c${entity.name} has no target.`, 'color: blue;');
      }
    }
  }
  console.log("Turn cycle complete.");
};

const basicAttack = (character: CharacterType, enemy: EnemyType) => {
  const updatedHealth = character.health - enemy.attack;
  return updatedHealth;
};
