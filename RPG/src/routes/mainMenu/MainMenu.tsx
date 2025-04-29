import styles from '../Route.module.css';
import UserNameInput from './UserNameInput';
import { NewGameBtn } from './NewGameBtn';
import { ContinueGameBtn } from './ContinueGameBtn';
import { useEffect, useState } from 'react';
import NavigateBtn from '../../components/ui/NavigateBtn';
import Background from '../../components/ui/Background';
import HighScoreDisplay from './HighScoreDisplay';
import AudioManager from '../../gameData/AudioManager';

const MainMenu = () => {
    const [isInProgress, setIsInProgress] = useState(false);
    AudioManager.stop();
    useEffect(() => {
        const inProgressGame = localStorage.getItem('inProgressGame');
        if (inProgressGame === 'true') {
            setIsInProgress(true);
        }
    }, []); // Empty dependency array -> runs once on mount

    return (
        <>
            <div className={styles.mainContainer}>
                <h1>Sacred Loop</h1>
                <HighScoreDisplay />
                <UserNameInput />
                <NewGameBtn />
                {isInProgress && <ContinueGameBtn />}
                <NavigateBtn locationValue="/options" location="Options" />
            </div>
            <Background />
        </>
    );
};

export default MainMenu;