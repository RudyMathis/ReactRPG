import { useAtom } from "jotai";
import { GameLevelAtom } from "../../atom/GameLevelAtom";
import NavigateBtn from "../../components/ui/NavigateBtn";
import Grid from "./Grid";
import TurnOrderDisplay from "../../gameMechanics/turnOrder/TurnOrderDisplay";
import CurrentLevelDisplay from "../../components/ui/CurrentLevelDisplay";
import EndofRoundDisplay from "./EndOfRoundDisplay";
import { backgroundAtom } from "../../atom/BackgroundAtom";
import styles from './GameState.module.css';
import stylesUI from '../../components/ui/UI.module.css'
import SettingsIcon from "../../components/ui/SettingsIcon";
import ActionTextDisplay from "../../components/ui/ActionTextDisplay";

const LevelLayout = () => {
    const [currentGameLevel] = useAtom(GameLevelAtom);
    const isRoundOver = currentGameLevel.isRoundOver;
    localStorage.setItem('inProgressGame', 'true')
    const [background] = useAtom(backgroundAtom);

    return (
        <div className={styles.levelLayout}>
            <div className={styles.topBar}>
                <div className={stylesUI.leftContainer}>
                    <NavigateBtn locationValue="/" location="Menu" />
                    <SettingsIcon />
                </div>
                <TurnOrderDisplay />
                <CurrentLevelDisplay />
            </div>
            <img src={`/assets/backgrounds/${background}.jpg`} className={stylesUI.glow} data-glow={background} />
            <div className={stylesUI.crt}></div>
            <Grid />
            <img className={stylesUI.backgroundBorder} src="/assets/backgrounds/crt_frame.png" />
            {isRoundOver && <EndofRoundDisplay />}
            <ActionTextDisplay />
        </div>
    );
}

export default LevelLayout;