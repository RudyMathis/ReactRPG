import React from 'react';
import { useState, useCallback, useRef, useEffect  } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { turnCountAtom } from '../../atom/UseTurnCountAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import ActionMenu from '../../components/menu/ActionMenu';
import CharacterDisplay from '../../components/entityDetail/CharacterDisplay';
import EnemyDisplay from '../../components/entityDetail/EnemyDisplay';
import DetailScreen from '../../components/entityDetail/DetailScreen';
import Btn from '../../components/Btn';
import './Grid.css';
import { storeAtom } from '../../atom/storeAtom';
import { GameLevelAtom } from '../../atom/GameLevelAtom';

const Grid = () => {
  const currentTurn = storeAtom.get(turnCountAtom); // Read current turn
  const [characters] = useAtom(CharacterAtom);
  const [enemies, setEnemies] = useAtom(EnemyAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const turnOrder = useTurnOrder();
  const [playerTarget, setPlayerTarget] = useAtom(playerTargetAtom);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const inputPromiseResolverRef = useRef<(() => void) | null>(null);
  // const [initialized, setInitialized] = useState(false);
  const [gameLevel] = useAtom(GameLevelAtom);
  const [activeDetailScreen, setActiveDetailScreen] = useState<CharacterType | EnemyType | null>(null);
  const [startOfRound, setStartOfRound] = useState(true);

  useEffect(() => {
    if (!gameLevel.isRoundOver) {
      // When a new round starts (isRoundOver becomes false),
      // reinitialize enemy ordering.
      const enemyArray = Object.values(enemies);
      const shuffled = enemyArray.sort(() => Math.random() - 0.5)
        .map((enemy, index) => ({ ...enemy, order: index + 1 }));
      const reorderedEnemies = shuffled.reduce((acc: Record<number, EnemyType>, enemy) => {
        acc[enemy.id] = enemy;
        return acc;
      }, {});
      setEnemies(reorderedEnemies);
    }
  }, [gameLevel.isRoundOver]);
  
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

  const checkTurnOrderAndRunLogic = () => {
    if (turnOrder.length > 0) {
      runTurnLogic(turnOrder, waitForInput);
      setStartOfRound(false);
    }
  };

  const handlePlayerTargeted = (entity: EnemyType | CharacterType) => {
    setPlayerTarget(prev => (prev?.id === entity.id ? null : entity)); // Untarget if already selected
    console.log("Player targeted", entity.name);
  };

  const toggleMenuVisibility = (id: number | null, type: 'character' | 'enemy' | null) => {
      setActiveMenu({ id: null, type: null }); // First, reset state
      setTimeout(() => { 
        setActiveMenu(prev => prev.id === id && prev.type === type ? { id: null, type: null } : { id, type });
      }, 0);
  };

  const displayDetailScreen = (entity: CharacterType | EnemyType) => {
    setActiveDetailScreen(entity);
  };
  
  const closeDetailScreen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setActiveDetailScreen(null);
    }
  };

  return (
    <div className="board">
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <React.Fragment key={char.id}>
          <div
            key={char.id}
            className='entity-container'
            onClick={() => toggleMenuVisibility(char.id, 'character')}
            style={{
              position: 'relative',
              gridColumn: (index % 2) === 0 ? 2 : 3,
              gridRow: ((index + 1)* 2) + 1
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
                detailScreen={() => displayDetailScreen(char)}
              />
            )}
          </div>
        </React.Fragment>
      ))}
      
      {/* Render enemies */}
      {Object.values(enemies)
      .sort((a, b) => a.order - b.order) // Sort by the shuffled order
      .map((enemy, index) => (
        <React.Fragment key={enemy.id}>
          <div
            className='entity-container'
            onClick={() => toggleMenuVisibility(enemy.id, 'enemy')}
            style={{
              position: 'relative',
              gridColumn: index % 2 === 0 ? 8 : 9,
              gridRow: ((index + 1)* 2) + 1
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
                detailScreen={() => displayDetailScreen(enemy)}
              />
            )}
          </div>
        </React.Fragment>
      ))}
      {/* Detail Screen */}
      {activeDetailScreen && (
        <div className="detail-screen-overlay" onClick={closeDetailScreen}>
          <div className="detail-screen-content" onClick={(e) => e.stopPropagation()}>
            <DetailScreen entity={activeDetailScreen} />
          </div>
        </div>
      )}
      {currentTurn == 1 && startOfRound == true && <Btn onClick={checkTurnOrderAndRunLogic} className="begin" text="Begin" />}
    </div>
  );
};

export default Grid;