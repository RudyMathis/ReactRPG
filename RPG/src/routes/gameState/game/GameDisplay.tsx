import { useState, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../../atom/CharacterAtom';
import EnemyAtom, { EnemyType } from '../../../atom/BaseEnemyAtom';
import { useTurnOrder }  from '../../../gameMechanics/turnOrder/useTurnOrder';
import { playerTargetAtom } from '../../../atom/PlayerTargetAtom';
import { runTurnLogic } from '../../../gameMechanics/turnOrder/TurnLogic';
import Btn from '../../../components/ui/Btn';
import { GameLevelAtom } from '../../../atom/GameLevelAtom';
import EndGameDisplay from '../EndGameDisplay';
import SoundManager from '../../../gameData/SoundManager';
import styles from '../GameState.module.css';
import { useTutorialManager } from '../../tutorial/useTutorialManager';
import { backgroundAtom } from '../../../atom/BackgroundAtom';
import { useHandleTutorialStart } from '../../tutorial/useHandleTutorialStart';
import { useGameInput } from './useGameInput';
import CharacterEntities from './CharacterEntities';
import EnemyEntities from './EnemyEntities';
import DetailScreenOverlay from './DetailScreenOverlay';
import { activeMenuAtom, toggleMenuAtom } from '../../../atom/ToggleMenuAtom';

type EntityType = 'character' | 'enemy' | null; 

const GameDisplay = () => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
    const [enemies, setEnemies] = useAtom(EnemyAtom);
    const [activeMenu] = useAtom(activeMenuAtom);
    const [, toggleMenu] = useAtom(toggleMenuAtom);

    const turnOrder = useTurnOrder();
    const [playerTarget, setPlayerTarget] = useAtom(playerTargetAtom);
    const [activeDetailScreen, setActiveDetailScreen] = useState<CharacterType | EnemyType | null>(null);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const [background] = useAtom(backgroundAtom);
    const {tutorial, jumpToStep} = useTutorialManager();
    const handleTutorialStart = useHandleTutorialStart();
    const hasStartedRef = useRef(false);
    const { waitingForInput, waitForInput, resolveInput } = useGameInput();

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

        if (tutorial.isTutorial) {
            // jumpToStep(6);
            // requestAnimationFrame(() => {
                setTimeout(() => {
                    jumpToStep(7);
                }, 4000);
            // });
            
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

    const handlePlayerTargeted = (entity: EnemyType | CharacterType | null) => {
        setPlayerTarget(prev => (prev?.id === entity?.id ? null : entity)); 
        // console.log("Player targeted", entity?.name);
    };
    const handleToggleMenu = (id: number | null, type: EntityType) => {
        toggleMenu({ id, type });
    };

    const handleToggleMenuClick = () => {
        handleToggleMenu(null, null);
    };

    return (
        <div className={styles.board} data-background={background}>
            <div className={styles.boardOverlay} onClick={handleToggleMenuClick}></div>
            
            <CharacterEntities
                characters={selectedCharacters}
                activeMenu={activeMenu}
                waitingForInput={waitingForInput}
                playerTarget={playerTarget}
                onTarget={handlePlayerTargeted}
                onSpell={resolveInput}
                showDetail={setActiveDetailScreen}
                toggleMenu={handleToggleMenu}                
            />
            <EnemyEntities
                enemies={Object.values(enemies).sort((a, b) => a.order - b.order)}
                activeMenu={activeMenu}
                waitingForInput={waitingForInput}
                playerTarget={playerTarget}
                onTarget={handlePlayerTargeted}
                onSpell={resolveInput}
                showDetail={setActiveDetailScreen}
                toggleMenu={handleToggleMenu}
            />

            {activeDetailScreen && (
                <DetailScreenOverlay
                    entity={activeDetailScreen}
                    close={() => setActiveDetailScreen(null)}
                    {...tutorial.isTutorial && { tutorialLayer: 'top' }}
                />
            )}

            {!currentGameLevel.isHideBegin && (
                <Btn
                    onClick={checkTurnOrderAndRunLogic}
                    className={styles.begin}
                    text="Begin"
                    {...(tutorial.isTutorial && tutorial.tutorialEntity === 'Begin' ? { 'data-tutorial-layer': 'top' } : {})}
                />
            )}

            {currentGameLevel.isGameOver && <EndGameDisplay />}
        </div>
    );
};

export default GameDisplay;