import './MainMenu.css';
import UserNameInput from './UserNameInput';
import { NewGameBtn } from './NewGameBtn';
import { ContinueGameBtn } from './ContinueGameBtn';
import { useEffect, useState } from 'react';
import NavigateBtn from '../../components/ui/NavigateBtn';

const MainMenu = () => {
    const [isInProgress, setIsInProgress] = useState(false);

    useEffect(() => {
        const inProgressGame = localStorage.getItem('inProgressGame');
        if (inProgressGame === 'true') {
            setIsInProgress(true);
        }
    }, []); // Empty dependency array -> runs once on mount

    return (
        <div className="main-menu">
            <h1>React RPG</h1>
            <UserNameInput />
            <NewGameBtn />
            {isInProgress && <ContinueGameBtn />}
            <NavigateBtn locationValue="/options" location="Options" />
        </div>
    );
};


export default MainMenu;