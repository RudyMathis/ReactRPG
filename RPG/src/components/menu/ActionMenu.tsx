import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import './ActionMenu.css'

type ActionMenuProps ={
    isVisible: boolean;
    toggleVisibility: () => void;
}

const ActionMenu = ({ isVisible }: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.currentTurn && char.isSelected);

    return (
        isVisible && (
            <div className="action-menu-container">
                {selectedCharacters.map((char) => (
                    char.currentTurn ? 
                        <div key={char.id} className="action-menu-item">
                            {char.spells.map((spell, index) => (
                                <button key={`${char.id}-${index}`}>{spell}</button>
                            ))}
                        </div> 
                        : null
                ))}
            </div>
        )
    );
};

export default ActionMenu;

