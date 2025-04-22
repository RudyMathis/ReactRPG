import { storeAtom } from "../../atom/storeAtom";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTarget } from '../enemyTarget/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import { GainExperience } from "../GainExperince";
import { ManaRegen } from "../ManaRegen";
import { CharacterAttack } from "../../gameData/spellData/CharacterAttack";
import { CharacterBuff } from "../../gameData/spellData/CharacterBuff";
import { EnemyAttack } from "../../gameData/spellData/EnemyAttack";
import { Statuses } from "../../gameData/spellData/statuses/Statuses";
import { SaveData } from "../SaveData";
import { CalculateTurnScore } from "../CalculateTurnScore";
import { ScoreAtom } from "../../atom/persistant/ScoreAtom";

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
  const currentTurn = storeAtom.get(turnCountAtom);
  let i = parseInt(localStorage.getItem('currentEntityTurn') || '0', 10); // Load i from localStorage

  if (handleAllCharactersDead()) return;
  if (handleAllEnemiesDead()) return;

  console.log("Turn Order:", turnOrder);
  while (i < turnOrder.length) {
      SaveData(i); // Save the current turn before processing

      let entity = turnOrder[i];

      if (!entity || entity.health <= 0) {
          console.log(`${entity.name} is dead.`);
          i++;
          continue;
      }

      entity = entity.type === "player" ? storeAtom.get(CharacterAtom)[entity.id] : storeAtom.get(EnemyAtom)[entity.id];
      Statuses(entity);
      if ('target' in entity) {
          const enemy = storeAtom.get(EnemyAtom)[entity.id];
          setTimeout(() => {
          }, 2000);

          if (!enemy) {
              console.warn(`Enemy with ID ${entity.id} not found in EnemyAtom.`);
              i++;
              continue;
          }

          if (enemy.health <= 0) {
              console.log(`${enemy.name} died from debuff effects.`);
              i++;
              continue;
          }

          await new Promise(resolve => setTimeout(resolve, 2000));

          const allCharacters = Object.values(storeAtom.get(CharacterAtom));
          const alivePlayers = allCharacters.filter(c => c.type === 'player' && c.health > 0 && c.isSelected) as CharacterType[];

          const target = getEnemyTarget(enemy, alivePlayers);
          const character = Object.values(storeAtom.get(CharacterAtom)).find(c => c.id === target?.id && c.health > 0 && c.isSelected);

          if (!character || enemy.speed === 0) {
              console.warn(`No valid target found for ${enemy.name} or enemy speed is 0`);
              i++;
              continue;
          }

          const updatedCharacterHealth = EnemyAttack(character, enemy, character) ?? character.health;
          CharacterHealthUpdate(character, updatedCharacterHealth);

          console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);
          if (handleAllCharactersDead() || handleAllEnemiesDead()) return;
          i++;
      } else {
          const character = entity as CharacterType;
          setTimeout(() => {
          }, 2000);
          
          if (character.health <= 0) {
              console.log(`${character.name} is dead.`);
              i++;
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
            const updatedEnemyHealth = CharacterAttack(playerTarget, character, playerTarget, spell as string, spellCost);

            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [playerTarget.id]: {
                    ...prev[playerTarget.id],
                    health: updatedEnemyHealth,
                },
            }));

            const enemies = storeAtom.get(EnemyAtom);
            const deadEnemies: number[] = [];
            
            Object.values(enemies).forEach((enemy) => {
                if (enemy.health <= 0 && !enemy.hasScored) {
                    deadEnemies.push(enemy.id);
            
                    // Award points
                    const killedEnemyLevel = enemy.level;
                    CalculateTurnScore(killedEnemyLevel);
                    
                    // Mark as scored
                    storeAtom.set(EnemyAtom, (prev) => ({
                      ...prev,
                      [enemy.id]: {
                          ...prev[enemy.id],
                          hasScored: true,
                        },
                      }));
                      console.log('killed enemy level', killedEnemyLevel, "enemy", enemy);
                    }
            });
            
            if (deadEnemies.length > 0) {
                localStorage.setItem('Score', JSON.stringify(storeAtom.get(ScoreAtom)));
            }
            

          if (handleAllCharactersDead() || handleAllEnemiesDead()) return;

          } else if (playerTarget) {
              const updatedTargetHealth = CharacterBuff(character, playerTarget, spell as string, spellCost);
              CharacterHealthUpdate(playerTarget.id === character.id ? character : playerTarget, updatedTargetHealth);
          }

          storeAtom.set(CharacterAtom, prev => ({
              ...prev,
              [character.id]: { ...character, currentTurn: false }
          }));

          if (handleAllCharactersDead() || handleAllEnemiesDead()) return;
          i++;
      }
  }

  ManaRegen();
  storeAtom.set(turnCountAtom, currentTurn + 1);
  SaveData(0); // Save the final turn data

  console.log(`Turn ${currentTurn} ended.`);
  setTimeout(() => runTurnLogic(turnOrder, waitForInput), 1000);
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
    storeAtom.set(GameLevelAtom, (prev) => ({
      ...prev,
      isRoundOver: true
    }));
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