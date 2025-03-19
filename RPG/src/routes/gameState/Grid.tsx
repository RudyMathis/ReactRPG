import { useState, useCallback, useRef, useMemo  } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import ActionMenu from '../../components/menu/ActionMenu';
import CharacterDisplay from '../../components/entityDetail/CharacterDisplay';
import EnemyDisplay from '../../components/entityDetail/EnemeyDisplay';
import './Grid.css';

// A simple shuffle function, if needed for enemy order.
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Grid = () => {
  const [characters] = useAtom(CharacterAtom);
  const [enemies] = useAtom(EnemyAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const shuffledEnemies = useMemo(() => shuffleArray(Object.values(enemies)), []);
  const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const turnOrder = useTurnOrder();
  const [playerTarget, setPlayerTarget] = useAtom(playerTargetAtom);
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
    setActiveMenu({ id: null, type: null }); // Hide menu
    if (inputPromiseResolverRef.current) {
      inputPromiseResolverRef.current();
      inputPromiseResolverRef.current = null;
    }
};

  const handlePlayerTargeted = (entity: EnemyType | CharacterType) => {
    setPlayerTarget(prev => (prev?.id === entity.id ? null : entity)); // Untarget if already selected
    console.log("Player targeted", entity.name);
  };


  const checkTurnOrderAndRunLogic = () => {
    if (turnOrder.length > 0) {
      runTurnLogic(turnOrder, waitForInput);
    }
  };

  const toggleMenuVisibility = (id: number | null, type: 'character' | 'enemy' | null) => {
      setActiveMenu(prev => prev.id === id && prev.type === type ? { id: null, type: null } : { id, type });
  };
  

  return (
    <div className="board">
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <div
          key={char.id}
          onClick={() => toggleMenuVisibility(char.id, 'character')}
          style={{
            position: 'relative',
            gridColumn: (index % 2) === 0 ? 2 : 3,
            gridRow: (index * 2) + 1
          }}
        >
          <div onClick={() => handlePlayerTargeted(char)}>
            <CharacterDisplay character={char} />
          </div>
          {waitingForInput && playerTarget && (
            <ActionMenu 
              isVisible={activeMenu.id === char.id && activeMenu.type === 'character'}
              type='character'
              toggleVisibility={() => toggleMenuVisibility(char.id, 'character')} 
              onSpell={handleNextTurnClick}
            />
          )}
        </div>
      ))}
      
      {/* Render enemies */}
      {shuffledEnemies.map((enemy, index) => (
        <div
          key={enemy.id}
          onClick={() => toggleMenuVisibility(enemy.id, 'enemy')}
          style={{
            position: 'relative',
            gridColumn: (index % 2) === 0 ? 18 : 19,
            gridRow: ((index + 1) * 2) - 1
          }}
        >
          <div onClick={() => handlePlayerTargeted(enemy)}>
            <EnemyDisplay enemy={enemy} />
          </div>
          {waitingForInput && playerTarget && (
            <ActionMenu 
              isVisible={activeMenu.id === enemy.id && activeMenu.type === 'enemy'}
              type='enemy'
              toggleVisibility={() => toggleMenuVisibility(enemy.id, 'enemy')} 
              onSpell={handleNextTurnClick}
            />
          )}
        </div>
      ))}
      <button onClick={checkTurnOrderAndRunLogic}>Start Turn</button>
    </div>
  );
};

export default Grid;