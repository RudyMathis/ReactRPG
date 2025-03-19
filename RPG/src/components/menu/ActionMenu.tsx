import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import './ActionMenu.css'

type ActionMenuProps ={
    isVisible: boolean;
    toggleVisibility: () => void;
    onSpell: () => void;
}

const ActionMenu = ({ isVisible, onSpell }: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.currentTurn && char.isSelected);

    return (
        isVisible && (
            <div style={{ position: 'relative'}}>
                <div className="action-menu-container" >
                    {selectedCharacters.map((char) => (
                        char.currentTurn ? 
                            <div key={char.id} className="action-menu-item">
                                {char.spells.map((spell, index) => (
                                    <button 
                                        key={`${char.id}-${index}`}
                                        onClick={() => onSpell()} 
                                    >
                                        {spell}
                                    </button>
                                ))}
                            </div> 
                            : null
                    ))}
                </div>
            </div>
        )
    );
};

export default ActionMenu;

