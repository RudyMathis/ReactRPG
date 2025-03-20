import { useState, useCallback, useRef, useMemo  } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import ActionMenu from '../../components/menu/ActionMenu';
import CharacterDisplay from '../../components/entityDetail/CharacterDisplay';
import EnemyDisplay from '../../components/entityDetail/EnemyDisplay';
import './Grid.css';
import React from 'react';
import DetailScreen from '../../components/entityDetail/DetailScreen';

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
      setActiveMenu({ id: null, type: null }); // First, reset state
      setTimeout(() => { 
        setActiveMenu(prev => prev.id === id && prev.type === type ? { id: null, type: null } : { id, type });
      }, 0);
  };

  const [hoveredEntity, setHoveredEntity] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const handleMouseEnter = (id: number, type: 'character' | 'enemy') => {
    setHoveredEntity({ id, type });
  };

  const handleMouseLeave = () => {
    setHoveredEntity({ id: null, type: null });
  };

  return (
    <div className="board">
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <React.Fragment key={char.id}>
          <div
            key={char.id}
            onClick={() => toggleMenuVisibility(char.id, 'character')}
            onMouseEnter={() => handleMouseEnter(char.id, 'character')}
            onMouseLeave={handleMouseLeave}
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
                onSpell={handleNextTurnClick}
              />
            )}
          </div>
          {hoveredEntity.id === char.id && hoveredEntity.type === 'character' && (
            <DetailScreen entity={char} />
          )}
        </React.Fragment>
      ))}
      
      {/* Render enemies */}
      {shuffledEnemies.map((enemy, index) => (
        <React.Fragment key={enemy.id}>
          <div
            onClick={() => toggleMenuVisibility(enemy.id, 'enemy')}
            onMouseEnter={() => handleMouseEnter(enemy.id, 'enemy')}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              gridColumn: index % 2 === 0 ? 18 : 19,
              gridRow: (index + 1) * 2 - 1
            }}
          >
            <div onClick={() => handlePlayerTargeted(enemy)}>
              <EnemyDisplay enemy={enemy} />
            </div>
            {waitingForInput && playerTarget && (
              <ActionMenu 
                isVisible={activeMenu.id === enemy.id && activeMenu.type === 'enemy'}
                type='enemy'
                onSpell={handleNextTurnClick}
              />
            )}
          </div>
          {hoveredEntity.id === enemy.id && hoveredEntity.type === 'enemy' && (
            <DetailScreen entity={enemy} />
          )}
        </React.Fragment>
      ))}
      <button onClick={checkTurnOrderAndRunLogic}>Start Turn</button>
    </div>
  );
};

export default Grid;