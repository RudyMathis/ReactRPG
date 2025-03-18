import { useState, useCallback, useRef, useMemo  } from 'react';
import { useSetAtom, useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import CharacterDisplay from '../../components/entityDetail/CharacterDisplay';
import EnemyDisplay from '../../components/entityDetail/EnemeyDisplay';
import './Grid.css';

// A simple shuffle function, if needed for enemy order.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Grid = () => {
  // Get characters and enemies from atoms.
  const [characters] = useAtom(CharacterAtom);
  const [enemies] = useAtom(EnemyAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const shuffledEnemies = useMemo(() => shuffleArray(Object.values(enemies)), []);
  const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const turnOrder = useTurnOrder();
  const setPlayerTarget = useSetAtom(playerTargetAtom);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const inputPromiseResolverRef = useRef<(() => void) | null>(null);
  
  const waitForInput = useCallback((): Promise<void> => {
    setWaitingForInput(true);
    return new Promise(resolve => {
      inputPromiseResolverRef.current = resolve;
    });
  }, []);

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

  const toggleMenuVisibility = (id: number, type: 'character' | 'enemy') => {
      setActiveMenu(prev => prev.id === id && prev.type === type ? { id: null, type: null } : { id, type });
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
          onClick={() => toggleMenuVisibility(char.id, 'character')}
        >
          <CharacterDisplay
            character={char}
            isActive={activeMenu.id === char.id && activeMenu.type === 'character'}
            toggleVisibility={() => toggleMenuVisibility(char.id, 'character')}
          />
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
          onClick={() => toggleMenuVisibility(enemy.id, 'enemy')}
        >
          <div onClick={() => handlePlayerTargeted(enemy)}>
            <EnemyDisplay
              enemy={enemy}
              isActive={activeMenu.id === enemy.id && activeMenu.type === 'enemy'}
              toggleVisibility={() => toggleMenuVisibility(enemy.id, 'enemy')}
            />
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