import { storeAtom } from "../../atom/storeAtom";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../enemyTarget/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import { handleStatusEffects } from '../../gameData/Status';
import { basicCharacterAttack, basicCharacterBuff, basicEnemyAttack } from '../../gameData/Spells';
import { GainExperience } from "../GainExperince";
import { ManaRegen } from "../ManaRegen";

// Derive types from the atoms
type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;


export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const currentTurnOrder = [...turnOrder]; // Create a copy to avoid modifying the original
  const currentTurn = storeAtom.get(turnCountAtom);

  if (handleAllCharactersDead()) return;
  if (handleAllEnemiesDead()) return;

  for (let i = 0; i < currentTurnOrder.length; i++) {
      let entity = currentTurnOrder[i];

      // Re-fetch the entity from the store to get the latest state
      if (entity.type === "player") {
          entity = storeAtom.get(CharacterAtom)[entity.id];
      } else {
          entity = storeAtom.get(EnemyAtom)[entity.id];
      }

      if (!entity) continue;

      handleStatusEffects(entity);

      if (entity.type === "player") {
          entity = storeAtom.get(CharacterAtom)[entity.id];
          currentTurnOrder[i] = entity;
      } else {
          entity = storeAtom.get(EnemyAtom)[entity.id];
          currentTurnOrder[i] = entity;
      }

      if ('target' in entity) {
          // Enemy turn logic
          const enemy = storeAtom.get(EnemyAtom)[entity.id];

          if (!enemy) {
              console.warn(`Enemy with ID ${entity.id} not found in EnemyAtom.`);
              continue;
          }

          if (enemy.health <= 0) {
              console.log(`${enemy.name} died from debuff effects.`);
              continue;
          }

          await new Promise(resolve => setTimeout(resolve, 1500));

          const targetName = getEnemyTargetName(enemy, currentTurnOrder.filter(c => c.type === 'player' && c.health > 0) as CharacterType[]);
          const character = currentTurnOrder.find(c => c.name === targetName) as CharacterType;

          if (!character || enemy.speed === 0) {
              console.warn(`No valid target found for ${enemy.name} or enemy speed is 0`);
              continue;
          }
          const spell = storeAtom.get(selectedSpellAtom);
          const spellCost = Number(spell?.split('$')[1]);

          const updatedHealth = basicEnemyAttack(character, enemy, character, spellCost);
          CharacterHealthUpdate(character, updatedHealth);

          console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);
          if (handleAllCharactersDead()) return;
          if (handleAllEnemiesDead()) return;
      } else {
          // Character turn logic
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
          const spellCost = Number(spell?.split('$')[1]);
          console.log(`Using spell: ${spell}`);

          if (playerTarget && 'target' in playerTarget) {
              const updatedHealth = basicCharacterAttack(playerTarget, character, spell as string, spellCost);

              storeAtom.set(EnemyAtom, (prev) => ({
                  ...prev,
                  [playerTarget.id]: {
                      ...prev[playerTarget.id],
                      health: updatedHealth,
                  },
              }));

              if (handleAllEnemiesDead()) return;
          } else {
              if (playerTarget !== null) {
                  if (playerTarget.id === character.id) {
                      const updatedHealth = basicCharacterBuff(character, playerTarget, spell as string, spellCost);
                      CharacterHealthUpdate(character, updatedHealth);
                  } else {
                      const updatedHealth = basicCharacterBuff(character, playerTarget, spell as string, spellCost);
                      CharacterHealthUpdate(playerTarget, updatedHealth);
                  }
              }
          }

          storeAtom.set(CharacterAtom, prev => ({
              ...prev,
              [character.id]: { ...character, currentTurn: false }
          }));

          if (handleAllCharactersDead()) return;
          if (handleAllEnemiesDead()) return;
      }
  }

  console.log(`Turn ${currentTurn} ended.`);
  ManaRegen();
  storeAtom.set(turnCountAtom, currentTurn + 1);

  setTimeout(() => runTurnLogic(currentTurnOrder, waitForInput), 1000);
};

const handleAllEnemiesDead = () => {
  const allEnemiesDead = Object.values(storeAtom.get(EnemyAtom)).every(e => e.health <= 0);

  if (allEnemiesDead) {
    storeAtom.set(GameLevelAtom, (prev) => ({
      ...prev,
      isRoundOver: true  
    }));
    
    storeAtom.set(CharacterAtom, prev => {
      return Object.fromEntries(Object.entries(prev).map(([id, char]) => {
        return [id, { ...char, currentTurn: false }];
      }));
    });

    const enemyAmount = Object.keys(storeAtom.get(EnemyAtom)).length;
    const characters = storeAtom.get(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);

    GainExperience(enemyAmount, selectedCharacters.length);

    return true;
  }
  return false;
};

const handleAllCharactersDead = () => { 
  // Check if the game should end
  const allCharactersDead =  Object.values(storeAtom.get(CharacterAtom)).every(e => e.health <= 0);
  
  if (allCharactersDead) {
    console.log(`Game Over. ${allCharactersDead}. You Lose`);
    return true; // Stop running turns
  }
  return false;
}

const CharacterHealthUpdate = (playerTarget: CharacterType, updatedHealth: number) => { 
  storeAtom.set(CharacterAtom, (prev) => ({
    ...prev,
    [playerTarget.id]: {
        ...prev[playerTarget.id],
        health: updatedHealth
    },
  }));
}