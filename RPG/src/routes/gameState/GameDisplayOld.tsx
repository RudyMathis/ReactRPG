import React from 'react';
import { useState, useCallback, useRef, useEffect  } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../gameMechanics/turnOrder/TurnLogic';
import ActionMenu from '../../components/entity/ActionMenuOld';
import DetailScreen from '../../components/entity/DetailScreen';
import Btn from '../../components/ui/Btn';
import { GameLevelAtom } from '../../atom/GameLevelAtom';
import EntityContainer from '../../components/entity/sprite/EntityContainer';
import EntityDisplayWrapper from '../../components/entity/sprite/EntityDisplayWrapper';
import EndGameDisplay from './EndGameDisplay';
import SoundManager from '../../gameData/SoundManager';
import styles from './GameState.module.css';
import { useTutorialManager } from '../tutorial/useTutorialManager';
import { backgroundAtom } from '../../atom/BackgroundAtom';
import { useHandleTutorialStart } from '../tutorial/useHandleTutorialStart';

const Grid = () => {
  const [characters] = useAtom(CharacterAtom);
  const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
  const [enemies, setEnemies] = useAtom(EnemyAtom);
  const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: 'character' | 'enemy' | null }>({ id: null, type: null });
  const turnOrder = useTurnOrder();
  const [playerTarget, setPlayerTarget] = useAtom(playerTargetAtom);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const inputPromiseResolverRef = useRef<(() => void) | null>(null);
  const [activeDetailScreen, setActiveDetailScreen] = useState<CharacterType | EnemyType | null>(null);
  const [currentGameLevel] = useAtom(GameLevelAtom);
  const [background] = useAtom(backgroundAtom);
  const {tutorial, jumpToStep} = useTutorialManager();
  const handleTutorialStart = useHandleTutorialStart();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (tutorial.isTutorial && !hasStartedRef.current) {
      hasStartedRef.current = true;
      handleTutorialStart();
      localStorage.removeItem('tutorialState');
    }
  }, [tutorial.isTutorial]);

  SoundManager.preloadSfx('Quick_Attack_Tar$0', '/assets/sfx/Quick_Attack.mp3');

  const checkTurnOrderAndRunLogic = () => {
    if (turnOrder.length > 0) {
        if (!SoundManager.getMusic() || SoundManager.getMusic()?.paused) {
            SoundManager.playMusic('/assets/sfx/battle_music_1.mp3');
        }
        runTurnLogic(turnOrder, waitForInput);
    }
      currentGameLevel.isRoundOver = false;
      currentGameLevel.isHideBegin = true

      if(tutorial.isTutorial){
        jumpToStep(6);
        setTimeout(() => {
          jumpToStep(7);
        }, 4000)
      }
  };

  useEffect(() => {
    if (tutorial.isTutorial && tutorial.isStartTutorial) {
      const reorder = (array: EnemyType[]) => {
        return array.map((enemy, index) => ({ ...enemy, order: index + 1 }))
          .reduce((acc: Record<number, EnemyType>, enemy) => {
            acc[enemy.id] = enemy;
            return acc;
          }, {});
      };

        const enemyArray = Object.values(enemies);
        const tutorialEnemies = enemyArray.filter((enemy) => enemy.isTutorial);
        setEnemies(reorder(tutorialEnemies));
    }
  }, [tutorial]);

  const waitForInput = useCallback((): Promise<void> => {
    setWaitingForInput(true);
    return new Promise(resolve => {
      inputPromiseResolverRef.current = resolve;
    });
  }, []);

  const handleNextTurnClick = () => {
    setWaitingForInput(false);
    setActiveMenu({ id: null, type: null }); 
    if (inputPromiseResolverRef.current) {
      inputPromiseResolverRef.current();
      inputPromiseResolverRef.current = null;
    }
  };

  const handlePlayerTargeted = (entity: EnemyType | CharacterType) => {
    setPlayerTarget(prev => (prev?.id === entity.id ? null : entity)); 
    // console.log("Player targeted", entity.name);
  };

  const toggleMenuVisibility = (id: number | null, type: 'character' | 'enemy' | null) => {
      setActiveMenu({ id: null, type: null });
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
    <div className={styles.board} data-background={background}>
      {/* Render selected characters */}
      {selectedCharacters.map((char, index) => (
        <React.Fragment key={char.id}>
            <EntityContainer
              entity={char}
              type="character"
              index={index}
              onClick={() => toggleMenuVisibility(char.id, 'character')}
            >
              <EntityDisplayWrapper
                entity={char}
                type="character"
                onTarget={handlePlayerTargeted}
              />
                {waitingForInput && playerTarget && playerTarget.health > 0 && (
                  <ActionMenu 
                    isVisible={activeMenu.id === char.id && activeMenu.type === 'character'}
                    type='character'
                    onSpell={handleNextTurnClick}
                    detailScreen={() => displayDetailScreen(char)}
                    isCurrentTurn={char}
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
                  isCurrentTurn={enemy}
                />
              )}
            </EntityContainer>
          </React.Fragment>
      ))}
      {activeDetailScreen && (
        <div className={styles.detailScreenOverlay} onClick={closeDetailScreen} {...(tutorial.isTutorial && { 'data-tutorial-layer': tutorial.tutorialLayer })}>
          <div className={styles.detailScreenContent} onClick={(e) => e.stopPropagation()}>
            <DetailScreen entity={activeDetailScreen} />
          </div>
        </div>
      )}
      {currentGameLevel.isHideBegin == false && <Btn onClick={checkTurnOrderAndRunLogic} className={styles.begin} text="Begin" {...(tutorial.isTutorial && { 'data-tutorial-layer': tutorial.tutorialLayer })}/>}
      {currentGameLevel.isGameOver && <EndGameDisplay />}
    </div>
  );
};

export default Grid;