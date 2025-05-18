import { useAtom, useAtomValue } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import NavigateBtn from "../../components/ui/NavigateBtn";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import CurrentLevelDisplay from "../../components/ui/CurrentLevelDisplay";
import EndofRoundDisplay from "./EndOfRoundDisplay";
import { backgroundAtom } from "../../atom/BackgroundAtom";
import styles from './GameState.module.css';
import stylesUI from '../../components/ui/UI.module.css'
import SettingsIcon from "../../components/ui/SettingsIcon";
// import ActionTextDisplay from "../../components/ui/ActionTextDisplay";
import TutorialDisplay from "../tutorial/TutorialDisplay";
import { tutorialAtom } from "../../atom/TutorialAtomNew";
import Btn from "../../components/ui/Btn";
import RelectionCurrentLevelDisplay from "../../components/ui/ReflectionCurrentLevelDisplay";
import GameDisplay from "./game/GameDisplay";

const LevelLayout = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const isRoundOver = currentGameLevel.isRoundOver;
    const tutorial = useAtomValue(tutorialAtom);
    const [background] = useAtom(backgroundAtom);

    if(currentGameLevel.isGameOver) {
        localStorage.setItem('inProgressGame', 'false')
    } else {
        localStorage.setItem('inProgressGame', 'true')
    }
    const handleReflection = () => {
    }
    
    return (
        <div className={styles.levelLayout}>
            <Btn className={styles.reflectionBtn} onClick={() => handleReflection()} text="menu" />
            <RelectionCurrentLevelDisplay />
            <div className={styles.topBar}>
                <NavigateBtn locationValue="/" location="Menu" />
                <TurnOrderDisplay />
                <CurrentLevelDisplay />
            </div>
            <div className={stylesUI.backgroundGlow} data-glow={background} ></div>
            <div className={stylesUI.crt}></div>
            <SettingsIcon />
            {tutorial.isTutorial && tutorial.isTutorialVisible && <TutorialDisplay />}
            <GameDisplay />
            <div className={stylesUI.backgroundBorder}></div>
            {isRoundOver && <EndofRoundDisplay />}
            {/* <ActionTextDisplay /> */}
        </div>
    );
}

export default LevelLayout;