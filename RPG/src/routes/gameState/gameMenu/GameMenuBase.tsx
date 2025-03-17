import './GameMenu.css'
import { useAtom } from 'jotai';
import CharacterAtom from '../../../atom/CharacterAtom';
import ExperienceBar from '../../../components/bars/ExperienceBar';
const GameMenuBase = () => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);

    return (
        <>
            <h1>Game Menu</h1>
            <div className="game-menu-container">
                <div className="character-mini-info-container">
                    {selectedCharacters.map((char) => (
                        <div key={char.id} className="character-mini-info">
                            <span>{char.name}</span>
                            <span><ExperienceBar experience={char.exp} maxExperience={char.maxExp} /></span>
                        </div>
                    ))}
                </div>

                {/* character info */}
                {/* character actions */}
                {/* character inventory */}
            </div>
        </>
    );
};

export default GameMenuBase;