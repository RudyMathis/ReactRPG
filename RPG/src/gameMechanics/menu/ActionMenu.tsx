import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import './ActionMenu.css'
const ActionMenu = () => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.selected);

    return (
        <div className="action-menu-container">
            {selectedCharacters.map((char) => (
                char.currentTurn ? 
                    <div key={char.id} className="action-menu-item">
                        {char.spells
                            .map((spell, index) => (
                                <button key={index}>{spell}</button>
                        ))}
                    </div> 
                    : null
            ))}
        </div>
    );
};

export default ActionMenu;
