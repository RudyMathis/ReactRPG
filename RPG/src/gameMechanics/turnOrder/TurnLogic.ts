import { storeAtom } from "../../atom/storeAtom";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTarget } from '../../gameData/enemies/EnemyTargetLogic';
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import { ManaRegen } from "../ManaRegen";
import { CharacterBuff } from "../../gameData/spellData/CharacterBuff";
import { EnemyAttack } from "../../gameData/spellData/EnemyAttack";
import { Statuses } from "../../gameData/spellData/statuses/Statuses";
import { SaveData } from "../SaveData";
import { ScorePoints } from "../ScorePoints";
import { HandleAllCharactersDead, HandleAllEnemiesDead } from "./HandleDead";
import { LoadInitialStates } from "../LoadInitialStates";
import { HandleCharacterHealthUpdate, HandleCharacterManaUpdate, HandleEnemyHealthUpdate, HandleSetCurrentTurn } from "../../atom/SetAtom";
import { getCharacterById } from "../../gameData/spellData/buffs/getCharacterById";

type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

LoadInitialStates();

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const currentTurn = storeAtom.get(turnCountAtom);
  let i = parseInt(localStorage.getItem('currentEntityTurn') || '0', 10); // Load i from localStorage

  if (HandleAllCharactersDead()) return;
  if (HandleAllEnemiesDead()) return;

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

        const updatedCharacterHealth = EnemyAttack(character, enemy, character) as number ?? character.health;
        HandleCharacterHealthUpdate(character, updatedCharacterHealth);

        console.log(`Enemy ${enemy.name} attacked ${character.name} for ${enemy.attack} damage.`);
        if (HandleAllCharactersDead() || HandleAllEnemiesDead()) return;
        i++;
      } else {
        const character = entity as CharacterType;
        
        if (character.health <= 0) {
            console.log(`${character.name} is dead.`);
            i++;
            continue;
        }

        storeAtom.set(playerTargetAtom, null);
        HandleSetCurrentTurn(character, true);

        console.log(`Character ${character.name}'s turn. Waiting for user input...`);
        await waitForInput();

        const playerTarget = storeAtom.get(playerTargetAtom);
        const spell = storeAtom.get(selectedSpellAtom);
        const spellCost = Number(spell?.split('$')[1]);
        console.log(`Using spell: ${spell}`);

        if (playerTarget && 'target' in playerTarget) {
          HandleEnemyHealthUpdate(playerTarget, character, spell as string, spellCost);
          ScorePoints();
            
          if (HandleAllCharactersDead() || HandleAllEnemiesDead()) return;

        } else if (playerTarget) {
          const buffResult = CharacterBuff(character, playerTarget, spell as string, spellCost);
        
          if (Array.isArray(buffResult)) {
            buffResult.forEach(({ id, health }) => {
              const targetChar = getCharacterById(id);
              if (targetChar) HandleCharacterHealthUpdate(targetChar, health);
            });
          } else if (
            typeof buffResult === "object" &&
            buffResult !== null &&
            "mana" in buffResult
          ) {
            const targetChar = getCharacterById(buffResult.id);
            if (targetChar) HandleCharacterManaUpdate(targetChar, buffResult.mana);
          } else if (typeof buffResult === "number") {
            HandleCharacterHealthUpdate(
              playerTarget.id === character.id ? character : playerTarget,
              buffResult
            );
          }
        }
        

        HandleSetCurrentTurn(character, false);

        if (HandleAllCharactersDead() || HandleAllEnemiesDead()) return;
        i++;
      }
  }

  ManaRegen();
  storeAtom.set(turnCountAtom, currentTurn + 1);
  SaveData(0); // Save the final turn data

  console.log(`Turn ${currentTurn} ended.`);
  setTimeout(() => runTurnLogic(turnOrder, waitForInput), 1000);
};