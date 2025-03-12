import { useState, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import { getEnemyTargetName } from '../../gameMechanics/enemyTarget/EnemyTargetLogic';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';

import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
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
  const shuffledEnemies = shuffleArray(Object.values(enemies));

  // Get the turn order via our custom hook (which sorts by speed, highest first).
  const turnOrder = useTurnOrder();


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
          className="character-sprite"
          id={char.name}
          style={{
            gridColumn: (index % 2) === 0 ? 2 : 3,
            gridRow: (index * 2) + 1
          }}
        >
          {char.name.slice(0, 3)}
        </div>
      ))}
      
      {/* Render enemies */}
      {shuffledEnemies.map((enemy, index) => (
        <div
          key={enemy.id}
          className="character-sprite"
          id={enemy.name}
          data-target={getEnemyTargetName(enemy, selectedCharacters)}
          style={{
            gridColumn: (index % 2) === 0 ? 18 : 19,
            gridRow: ((index + 1) * 2) - 1
          }}
        >
          {enemy.name.slice(0, 3)}
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
