import { useNavigate } from 'react-router';
import './MainMenu.css';
import UserNameInput from '../../components/menu/UserNameInput';
import { NewGameBtn } from '../../components/menu/NewGameBtn';
import { ContinueGameBtn } from '../../components/menu/ContinueGameBtn';
import { useEffect, useState } from 'react';

const MainMenu = () => {
    const [isInProgress, setIsInProgress] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const inProgressGame = localStorage.getItem('inProgressGame');
        if (inProgressGame === 'true') {
            setIsInProgress(true);
        }
    }, []); // Empty dependency array -> runs once on mount

    const handleOptions = () => {
        navigate('/options');
    };

    return (
        <div className="main-menu">
            <h1>React RPG</h1>
            <UserNameInput />
            <NewGameBtn />
            {isInProgress && <ContinueGameBtn />}
            <button onClick={handleOptions}>Options</button>
        </div>
    );
};


export default MainMenu;