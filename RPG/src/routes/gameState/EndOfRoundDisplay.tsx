import { GameLevelAtom, startNewRound } from "../../atom/GameLevelAtom";
import { storeAtom } from "../../atom/storeAtom";
import Btn from "../../components/ui/Btn";
import { GainExperience } from "../../gameMechanics/GainExperince";
import { FullRestore } from "../../gameMechanics/FullRestore";
import CharacterAtom from "../../atom/CharacterAtom";
import { Blessings } from "../../gameData/characters/blessings/Blessings";
import { blessingAtom } from "../../atom/BlessingsAtom";
import { useAtom } from "jotai";
import { turnCountAtom } from "../../atom/UseTurnCountAtom";
import styles from './GameState.module.css'
import { calculateScore } from "../../gameMechanics/CalculateScore";

const EndofRoundDisplay = () => {
    const AdditionalExperience = 25;
    const characters = storeAtom.get(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
    const [currentGameLevel] = useAtom(GameLevelAtom);
    
    const handleNavigation = (gainXP = false, fullResotre = false, blessings = false) => {
        if (gainXP) {
            GainExperience(AdditionalExperience, selectedCharacters.length);
        }

        if (fullResotre) {
            FullRestore();
        }

        if (blessings) {
            Blessings(); 
        }
        
        storeAtom.set(turnCountAtom, 1);
        localStorage.setItem('turnCount', JSON.stringify(turnCountAtom));
        localStorage.setItem('characters', JSON.stringify(storeAtom.get(CharacterAtom)));
        localStorage.setItem('currentEntityTurn', "0");
        localStorage.setItem('Score', `${JSON.stringify(calculateScore())}`);

        currentGameLevel.isRoundOver = true;
        
        startNewRound();
    };

    return (
        <div className={styles.endOfRoundDisplay}>
            <div className={styles.endOfRound}>
                {storeAtom.get(blessingAtom) !== true && <Btn onClick={() => handleNavigation(false, false, true)} text="Blessing & Next Round" />}
                <Btn onClick={() => handleNavigation(true, false, false)} text="Additional Experience & Next Round" />
                <Btn onClick={() => handleNavigation(false, true, false)} text="Full Restore & Next Round" />
            </div>
        </div>
    );
};

export default EndofRoundDisplay;