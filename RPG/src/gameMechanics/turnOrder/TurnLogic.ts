import { getDefaultStore } from 'jotai';
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../enemyTarget/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom"; // Import the spell atom

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

const store = getDefaultStore(); // <--- This lets us read atom values outside React components

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const characters = turnOrder.filter(e => !('target' in e)) as CharacterType[];

  const currentTurn = store.get(turnCountAtom); // Read current turn

  for (const entity of turnOrder) {

    if (handleStatusEffects(entity)) {
      continue; // Skip this entity's turn
    }
    if ('target' in entity) {
      // Enemy turn
      const enemy = entity as EnemyType;
      const targetName = getEnemyTargetName(enemy, characters.filter(c => !c.status.includes({ type: 'Dead', duration: Infinity })));
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
        [character.id]: { ...character, health: updatedHealth, status: character.health <= 0 ? [{ type: 'Dead', duration: Infinity }] : character.status }
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (updatedHealth <= 0 && !character.status.some(s => s.type === "Dead")) {
        character.status.push({ type: "Dead", duration: Infinity });
      }

      console.log(`Enemy ${enemy.name} attacked ${character.name} for ${updatedHealth} damage.`);

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
        const spell = store.get(selectedSpellAtom); // Get selected spell

        console.log(`Using spell: ${spell}`);

        const playerTarget = store.get(playerTargetAtom);

        if (playerTarget && 'target' in playerTarget) {
          const updatedHealth = basicCharacterAttack(playerTarget, character, spell as string);
          playerTarget.health = updatedHealth;

          // Update enemy state for health and status
          store.set(EnemyAtom, prev => ({
            ...prev,
            [playerTarget.id]: { 
              ...playerTarget, 
              health: updatedHealth,
              status: updatedHealth <= 0 
                ? [...playerTarget.status.filter(s => s.type !== "Dead"), { type: "Dead", duration: Infinity }]
                : playerTarget.status
            }
          }));

          if (updatedHealth <= 0 && !playerTarget.status.some(s => s.type === "Dead")) {
            playerTarget.status.push({ type: "Dead", duration: Infinity });
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
  
  console.log(`Turn ${store.get(turnCountAtom)} ended.`);
  store.set(turnCountAtom, currentTurn + 1);
};


const basicCharacterAttack = (enemy: EnemyType, character: CharacterType) => {
  return enemy.health - character.attack;
};


const basicEnemyAttack = (character: CharacterType, enemy: EnemyType) => {
  return character.health - enemy.attack;
};

const handleStatusEffects = (entity: CharacterType | EnemyType) => {
  const frozenStatus = entity.status.find(s => s.type === "Frozen");

  if (frozenStatus) {
    console.log(`${entity.name} is Frozen! Cannot act this turn.`);
    entity.speed = 0; // Disable movement

    if(entity as EnemyType) {
      store.set(EnemyAtom, prev => ({
        ...prev,
        [entity.id]: {
          ...entity,
          speed: 0
        } as EnemyType
      }));
    } else if(entity as CharacterType) {
      store.set(CharacterAtom, prev => ({
        ...prev,
        [entity.id]: {
          ...entity,
          speed: 0
        } as CharacterType
      }));
    }
    
    console.log(entity.speed);

    // Decrease duration
    frozenStatus.duration -= 1;

    // Remove status if duration is 0
    if (frozenStatus.duration <= 0) {
      entity.status = entity.status.filter(s => s.type !== "Frozen");
      console.log(`${entity.name} is no longer Frozen!`);
    }

    return true; // Return true if entity is still frozen
  }

  return false; // Return false if entity is not frozen
};
