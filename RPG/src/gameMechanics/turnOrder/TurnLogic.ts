// TurnLogic.ts
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  for (const entity of turnOrder) {
    if ('target' in entity) {
      // Enemy turn
      console.log(`Enemy ${entity.name} takes its turn.`);
      const damage = entity.attack;
      console.log(`Enemy ${entity.name} attacks and deals ${damage} damage!`);
      // Simulate a short delay for enemy actions.
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      // Character turn: wait for user input.
      console.log(`Character ${entity.name}'s turn. Waiting for user input...`);
      await waitForInput();
      console.log(`Continuing after user input for ${entity.name}.`);
    }
  }
  console.log("Turn cycle complete.");
};
