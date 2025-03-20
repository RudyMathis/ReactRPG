import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import './ActionMenu.css'

type ActionMenuProps ={
    isVisible: boolean;
    type: 'character' | 'enemy';
    onSpell: () => void;
}

const ActionMenu = ({ isVisible, type, onSpell }: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.currentTurn && char.isSelected);

    const [, setSelectedSpell] = useAtom(selectedSpellAtom);

    const handleSpellClick = (spell: string) => {
      setSelectedSpell(spell); // Store the selected spell
    };

    return (
        isVisible && (
            <div className={`action-menu-container ${type}`} >
                {selectedCharacters.map((char) => (
                    char.currentTurn ? 
                        <div key={char.id} className="action-menu-item">
                            {char.spells.map((spell, index) => (
                                <button 
                                    key={`${char.id}-${index}`}
                                    onClick={() => {
                                        onSpell();
                                        handleSpellClick(spell);
                                    }}
                                    data-spell={spell} 
                                >
                                    {spell.replace('_', ' ')}
                                </button>
                            ))}
                        </div> 
                        : null
                ))}
            </div>
        )
    );
};

export default ActionMenu;

