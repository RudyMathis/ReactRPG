import { startNewRound, GameLevelAtom } from "../../atom/GameLevelAtom";
import { useNavigate } from 'react-router';
import { storeAtom } from "../../atom/storeAtom";
import Btn from "../Btn";
import { GainExperience } from "../../gameMechanics/GainExperince";
import { FullRestore } from "../../gameMechanics/FullRestore";
import CharacterAtom from "../../atom/CharacterAtom";

const EndofRoundDisplay = () => {
    const navigate = useNavigate();
    const AdditionalExperience = 10;
    const characters = storeAtom.get(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);

    const handleNavigation = (gainXP = false, fullResotre = false) => {
        if (gainXP) {
            GainExperience(AdditionalExperience, selectedCharacters.length);
        }

        if (fullResotre) {
            FullRestore();
        }

        startNewRound(); // Start the next round

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
            transform: 'translate(-50%, -50%)',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Btn onClick={() => handleNavigation()} text="Next Round" />
                <h2>Blessing</h2>
                <Btn onClick={() => handleNavigation(true, false)} text="Additional Experience & Next Round" />
                <Btn onClick={() => handleNavigation(false, true)} text="Full Restore & Next Round" />
            </div>
        </div>
    );
};

export default EndofRoundDisplay;