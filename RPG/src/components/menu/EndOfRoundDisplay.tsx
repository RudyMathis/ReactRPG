import { startNewRound, GameLevelAtom } from "../../atom/GameLevelAtom";
import { useNavigate } from 'react-router';
import { storeAtom } from "../../atom/storeAtom";

const EndofRoundDisplay = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        startNewRound(); // Start the next round

        // Delay navigation until the state is updated
        setTimeout(() => {
            const updatedGameLevel = storeAtom.get(GameLevelAtom);
            navigate(`/game/${updatedGameLevel.level}-${updatedGameLevel.round}`);
        }, 0);
    };

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <button onClick={handleNavigation}>Next Round</button>
            <h2>Blessing</h2>
            <h2>Additional Experience</h2>
            <h2>Full Restore</h2>
        </div>
    );
};

export default EndofRoundDisplay;

