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

type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

const loadInitialStates = () => {
  const savedCharacters = localStorage.getItem('characters');
  const savedEnemies = localStorage.getItem('enemies');
  const savedTurnCount = localStorage.getItem('turnCount');

  if (savedCharacters) {
      storeAtom.set(CharacterAtom, JSON.parse(savedCharacters));
  }
  if (savedEnemies) {
      storeAtom.set(EnemyAtom, JSON.parse(savedEnemies));
  }
  if (savedTurnCount) {
      storeAtom.set(turnCountAtom, parseInt(savedTurnCount, 10));
  }
};

loadInitialStates();

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const currentTurnOrder = [...turnOrder];
  const currentTurn = storeAtom.get(turnCountAtom);

  if (handleAllCharactersDead()) return;
  if (handleAllEnemiesDead()) return;

  for (let i = 0; i < currentTurnOrder.length; i++) {
      let entity = currentTurnOrder[i];

      entity = entity.type === "player" ? storeAtom.get(CharacterAtom)[entity.id] : storeAtom.get(EnemyAtom)[entity.id];

      if (!entity) continue;

      handleStatusEffects(entity);

      entity = entity.type === "player" ? storeAtom.get(CharacterAtom)[entity.id] : storeAtom.get(EnemyAtom)[entity.id];
      currentTurnOrder[i] = entity;
      console.log("Entity before target check:", entity);
      if ('target' in entity) {
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
          // const character = currentTurnOrder.find(c => c.name === targetName) as CharacterType;
          const character = Object.values(storeAtom.get(CharacterAtom)).find(c => c.name === targetName && c.health > 0);


          if (!character || enemy.speed === 0) {
              console.warn(`No valid target found for ${enemy.name} or enemy speed is 0`);
              continue;
          }

          const updatedCharacterHealth = basicEnemyAttack(character, enemy, character) ?? character.health;
          CharacterHealthUpdate(character, updatedCharacterHealth);

          console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);
          if (handleAllCharactersDead()) return;
          if (handleAllEnemiesDead()) return;
      } else {
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
              const updatedEnemyHealth = basicCharacterAttack(playerTarget, character, spell as string, spellCost);

              storeAtom.set(EnemyAtom, (prev) => ({
                  ...prev,
                  [playerTarget.id]: {
                      ...prev[playerTarget.id],
                      health: updatedEnemyHealth,
                  },
              }));

              if (handleAllEnemiesDead()) return;
          } else if (playerTarget) {
              const updatedTargetHealth = basicCharacterBuff(character, playerTarget, spell as string, spellCost);
              CharacterHealthUpdate(playerTarget.id === character.id ? character : playerTarget, updatedTargetHealth);
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
  // Save states to localStorage
  localStorage.setItem('currentTurn', JSON.stringify(currentTurn + 1));
  localStorage.setItem('characters', JSON.stringify(storeAtom.get(CharacterAtom)));
  localStorage.setItem('enemies', JSON.stringify(storeAtom.get(EnemyAtom))); // save enemies here.
  localStorage.setItem('turnCount', JSON.stringify(storeAtom.get(turnCountAtom)));
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