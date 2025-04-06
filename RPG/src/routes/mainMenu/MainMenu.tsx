import { useNavigate } from 'react-router';
import './MainMenu.css';
import UserNameInput from '../../components/menu/UserNameInput';

const MainMenu = () => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/select-character');
    };
    const handleOptions = () => {
        navigate('/options');
    };

    return (
        <div className="main-menu">
            <h1>React RPG</h1>
            <UserNameInput />
            <button onClick={handleStart}>Start Game</button>
            <button onClick={handleOptions}>Options</button>
        </div>
    );
};

export default MainMenu;