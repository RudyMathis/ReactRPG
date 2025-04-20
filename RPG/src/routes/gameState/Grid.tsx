import React from 'react';
import { useState, useCallback, useRef, useEffect  } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import ActionMenu from '../../components/entity/ActionMenu';
import DetailScreen from '../../components/entity/DetailScreen';
import Btn from '../../components/ui/Btn';
import './GameState.css';
import { GameLevelAtom } from '../../atom/GameLevelAtom';
import { AttackAnimationAtom } from '../../atom/effects/AttackAnimationAtom';
import Overlay from '../../components/Overlay';
import Shadow from '../../components/entity/Shadow';
import EntityContainer from '../../components/entity/sprite/EntityContainer';
import EntityDisplayWrapper from '../../components/entity/sprite/EntityDisplayWrapper';

const Grid = () => {
  const [characters] = useAtom(CharacterAtom);
  const [enemies, setEnemies] = useAtom(EnemyAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const turnOrder = useTurnOrder();
  const [playerTarget, setPlayerTarget] = useAtom(playerTargetAtom);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const inputPromiseResolverRef = useRef<(() => void) | null>(null);
  const [gameLevel] = useAtom(GameLevelAtom);
  const [activeDetailScreen, setActiveDetailScreen] = useState<CharacterType | EnemyType | null>(null);
  const [currentGameLevel] = useAtom(GameLevelAtom);
  const [attackingEntities] = useAtom(AttackAnimationAtom);
  const background = localStorage.getItem('background');

  const checkTurnOrderAndRunLogic = () => {
    if (turnOrder.length > 0) {
      runTurnLogic(turnOrder, waitForInput);
    }
    currentGameLevel.isRoundOver = true
  };
  
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
    <div className="board" style={{ backgroundImage: `url(/assets/backgrounds/${background}.png)`}}>
      <Overlay />
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <React.Fragment key={char.id}>
            <EntityContainer
              entity={char}
              type="character"
              index={index}
              onClick={() => toggleMenuVisibility(char.id, 'character')}
            >
            <Shadow entity={char} attackingEntities={attackingEntities} />
            <EntityDisplayWrapper
              entity={char}
              type="character"
              onTarget={handlePlayerTargeted}
            />
            {waitingForInput && playerTarget && (
              <ActionMenu 
                isVisible={activeMenu.id === char.id && activeMenu.type === 'character'}
                type='character'
                onSpell={handleNextTurnClick}
                detailScreen={() => displayDetailScreen(char)}
              />
            )}
            </EntityContainer>
        </React.Fragment>
      ))}
      
      {/* Render enemies */}
      {Object.values(enemies)
        .sort((a, b) => a.order - b.order)
        .map((enemy, index) => (
          <React.Fragment key={enemy.id}>
            <EntityContainer
              entity={enemy}
              type="enemy"
              index={index}
              onClick={() => toggleMenuVisibility(enemy.id, 'enemy')}
            >
              <Shadow entity={enemy} attackingEntities={attackingEntities} />
              <EntityDisplayWrapper
                entity={enemy}
                type="enemy"
                onTarget={handlePlayerTargeted}
              />
              {waitingForInput && playerTarget && (
                <ActionMenu 
                  isVisible={activeMenu.id === enemy.id && activeMenu.type === 'enemy'}
                  type="enemy"
                  onSpell={handleNextTurnClick}
                  detailScreen={() => displayDetailScreen(enemy)}
                />
              )}
            </EntityContainer>
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
      {currentGameLevel.isRoundOver == false && <Btn onClick={checkTurnOrderAndRunLogic} className="begin" text="Begin" />}
    </div>
  );
};

export default Grid;