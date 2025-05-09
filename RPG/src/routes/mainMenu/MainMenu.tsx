import styles from '../Route.module.css';
import { NewGameBtn } from './NewGameBtn';
import { ContinueGameBtn } from './ContinueGameBtn';
import { useEffect, useState } from 'react';
// import NavigateBtn from '../../components/ui/NavigateBtn';
import Background from '../../components/ui/Background';
import HighScoreDisplay from './HighScoreDisplay';
import SoundManager from '../../gameData/SoundManager';

const MainMenu = () => {
    const [isInProgress, setIsInProgress] = useState(false);
    SoundManager.stopMusic();
    useEffect(() => {
        const inProgressGame = localStorage.getItem('inProgressGame');
        if (inProgressGame === 'true') {
            setIsInProgress(true);
        }
    }, []); // Empty dependency array -> runs once on mount

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={`${styles.s} ${styles.title}` }>S</h1>
                    <h1 className={`${styles.a} ${styles.title}`}>a</h1>
                    <h1 className={`${styles.c} ${styles.title}`}>c</h1>
                    <h1 className={`${styles.r} ${styles.title}`}>r</h1>
                    <h1 className={`${styles.e} ${styles.title}`}>e</h1>
                    <h1 className={`${styles.d} ${styles.title}`}>d</h1>
                    <h1 className={`${styles.l} ${styles.title}`}>L</h1>
                    <h1 className={`${styles.o} ${styles.title}`}>o</h1>
                    <h1 className={`${styles.o2} ${styles.title}`}>o</h1>
                    <h1 className={`${styles.p} ${styles.title}`}>p</h1>
                </div>
                <HighScoreDisplay />
                <NewGameBtn />
                {isInProgress && <ContinueGameBtn />}
                {/* <NavigateBtn locationValue="/options" location="Options" /> */}
            </div>
            <Background />
        </>
    );
};

export default MainMenu;