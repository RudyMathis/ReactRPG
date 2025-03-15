import { useState, useCallback, useRef, useMemo  } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../../gameMechanics/enemyTarget/EnemyTargetLogic';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import DetailScreen from '../../components/entityDetail/DetailScreen';
import HealthBar from '../../components/bars/HealthBar';
import ManaBar from '../../components/bars/ManaBar';
import './Grid.css';

// A simple shuffle function, if needed for enemy order.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Grid = () => {
  // Get characters and enemies from atoms.
  const [characters] = useAtom(CharacterAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.selected);
  
  const [enemies] = useAtom(EnemyAtom);
  const shuffledEnemies = useMemo(() => shuffleArray(Object.values(enemies)), []);

  // Get the turn order via our custom hook (which sorts by speed, highest first).
  const turnOrder = useTurnOrder();

  const setPlayerTarget = useSetAtom(playerTargetAtom);

  // State to control waiting for user input during character turns.
  const [waitingForInput, setWaitingForInput] = useState(false);
  // A ref to hold the promise resolver.
  const inputPromiseResolverRef = useRef<(() => void) | null>(null);
  
  // The waitForInput function returns a promise that resolves when the user clicks "Next Turn".
  const waitForInput = useCallback((): Promise<void> => {
    setWaitingForInput(true);
    return new Promise(resolve => {
      inputPromiseResolverRef.current = resolve;
    });
  }, []);

  // When the user clicks the button, resolve the promise.
  const handleNextTurnClick = () => {
    setWaitingForInput(false);
    if (inputPromiseResolverRef.current) {
      inputPromiseResolverRef.current();
      inputPromiseResolverRef.current = null;
    }
  };

  const handlePlayerTargeted = (entity: EnemyType | CharacterType) => {
    console.log("Player targeted", entity.name);
    setPlayerTarget(entity); // Set target directly in the atom
  };

  const checkTurnOrderAndRunLogic = () => {
    if (turnOrder.length > 0) {
      runTurnLogic(turnOrder, waitForInput);
    }
  };

  return (
    <div className="board">
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <div
          key={char.id}
          style={{
            gridColumn: (index % 2) === 0 ? 2 : 3,
            gridRow: (index * 2) + 1
          }}
        >
          <HealthBar health={char.health <= 0 ? 0 : char.health} maxHealth={char.maxHealth} />
          {char.maxMana > 0 && <ManaBar mana={char.mana} maxMana={char.maxMana} />}
          <div className={`character-sprite ${char.name} ${char.health <= 0 ? 'dead' : ''}`}>
            {char.name.slice(0, 3)}
          <DetailScreen entity={char} />
          </div>
        </div>
      ))}
      
      {/* Render enemies */}
      {shuffledEnemies.map((enemy, index) => (
        <div
          key={enemy.id}
          style={{
            gridColumn: (index % 2) === 0 ? 18 : 19,
            gridRow: ((index + 1) * 2) - 1
          }}
        >
          <HealthBar health={enemy.health <= 0 ? 0 : enemy.health} maxHealth={enemy.maxHealth} />
          {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} />}
          <div 
            onClick={() => handlePlayerTargeted(enemy)}
            data-target={getEnemyTargetName(enemy, selectedCharacters)}
            className={`character-sprite ${enemy.name} ${enemy.health <= 0 ? 'dead' : ''}`}>
            {enemy.name.slice(0, 3)}
          <DetailScreen entity={enemy} />
          </div>
        </div>
      ))}
      
      {/* Render the "Next Turn" button only when waiting for input */}
      {waitingForInput && (
        <button
          onClick={handleNextTurnClick}
          style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}
        >
          Next Turn
        </button>
      )}
      <button onClick={checkTurnOrderAndRunLogic}>Start Turn</button>
    </div>
  );
};

export default Grid;
