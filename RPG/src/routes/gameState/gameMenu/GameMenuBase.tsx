import './GameMenu.css'
import { useAtom } from 'jotai';
import CharacterAtom from '../../../atom/CharacterAtom';
const GameMenuBase = () => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.selected);

    return (
        <div className="game-menu-container">
            <h1>Game Menu</h1>
            <div className="character-mini-info-container">
                {selectedCharacters.map((char) => (
                    <div key={char.id} className="character-mini-info">
                        <span>{char.name}</span>
                        <span>{char.health}/{char.maxHealth}</span>
                        <span>{char.mana}/{char.maxMana}</span>
                        <span>{char.exp}/{char.maxExp}</span>
                    </div>
                ))}
            </div>

            {/* character info */}
            {/* character actions */}
            {/* character inventory */}
        </div>
    );
};

export default GameMenuBase;