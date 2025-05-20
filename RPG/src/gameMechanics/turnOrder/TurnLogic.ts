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
import { getCharacterById } from "../../gameData/spellData/defense/getCharacterById";
import { tutorialAtom } from "../../atom/TutorialAtom";
import { updatedTurnOder } from "./UpdateTurnOrder";

type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

LoadInitialStates();

export const runTurnLogic = async (
  turnOrder: (CharacterType | EnemyType)[],
  waitForInput: () => Promise<void>
) => {
  const currentTurn = storeAtom.get(turnCountAtom);
  let i = parseInt(localStorage.getItem('currentEntityTurn') || '0', 10);

  if (HandleAllCharactersDead()) return;
  if (HandleAllEnemiesDead()) return;

  turnOrder = updatedTurnOder();
  
  while (i < turnOrder.length) {
      SaveData(i);

      let entity = turnOrder[i];

      if (!entity || entity.health <= 0) {i++; continue;}

      entity = entity.type === "player" ? storeAtom.get(CharacterAtom)[entity.id] : storeAtom.get(EnemyAtom)[entity.id];
      Statuses(entity);
      const tutorial = storeAtom.get(tutorialAtom);
      
      if ('target' in entity) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if(storeAtom.get(tutorialAtom).tutorialId === 5) {
          storeAtom.set(tutorialAtom, 
            { 
                ...tutorial, 
                tutorialId: 6,
                isTutorialVisible: false,
            });
        }

        const enemy = storeAtom.get(EnemyAtom)[entity.id];

        if (!enemy) {i++; continue;}

        if (enemy.health <= 0) {if(HandleAllCharactersDead() || HandleAllEnemiesDead()) return; i++; continue;}

        const allCharacters = Object.values(storeAtom.get(CharacterAtom));
        const alivePlayers = allCharacters.filter(c => c.type === 'player' && c.health > 0 && c.isSelected) as CharacterType[];

        const target = getEnemyTarget(enemy, alivePlayers);
        const character = Object.values(storeAtom.get(CharacterAtom)).find(c => c.id === target?.id && c.health > 0 && c.isSelected);

        if (!character || enemy.speed === 0) {i++;continue;}

        const updatedCharacterHealth = EnemyAttack(character, enemy, character) as number ?? character.health;
        HandleCharacterHealthUpdate(character, updatedCharacterHealth);

        if (HandleAllCharactersDead() || HandleAllEnemiesDead()) return;
        i++;
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const character = entity as CharacterType;
        if (character.health <= 0) {i++; continue;}

        storeAtom.set(playerTargetAtom, null);
        HandleSetCurrentTurn(character, true);

        if(storeAtom.get(tutorialAtom).tutorialId === 6) {
          storeAtom.set(tutorialAtom, 
            { 
                ...tutorial, 
                tutorialId: 7,
                tutorialText: "Now it's your turn Shaman's turn.",
                isPrevTutorial: false,
                isNextTutorial: true,
                isTutorialClickable: false,
                isTutorialVisible: true,
                tutorialEntity: 'player',
                tutorialTextPosition: 'right',
            });
        }

        await waitForInput();

        const playerTarget = storeAtom.get(playerTargetAtom);
        const spell = storeAtom.get(selectedSpellAtom);
        const spellCost = Number(spell?.split('$')[1]);

        if (playerTarget && 'target' in playerTarget) {
          HandleEnemyHealthUpdate(playerTarget, character, spell as string, spellCost);
          ScorePoints();
            
          if (HandleAllCharactersDead() || HandleAllEnemiesDead()) return;

        } else if (playerTarget) {

          const buffResult = CharacterBuff(character, playerTarget, spell as string, spellCost);
        
          if (Array.isArray(buffResult)) {
            buffResult.forEach((result) => {
              if ("health" in result) {
                const targetChar = getCharacterById(result.id);
                if (targetChar) HandleCharacterHealthUpdate(targetChar, result.health);
              }
            });
          } else if ( typeof buffResult === "object" && buffResult !== null && "mana" in buffResult) {
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
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
  }

  ManaRegen();
  storeAtom.set(turnCountAtom, currentTurn + 1);
  SaveData(0);

  setTimeout(() => runTurnLogic(turnOrder, waitForInput), 1000);
};