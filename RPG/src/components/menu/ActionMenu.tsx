import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import './ActionMenu.css'

type ActionMenuProps = {
    isVisible: boolean;
    type: 'character' | 'enemy';
    onSpell: () => void;
    detailScreen: () => void;
};

const spellAudio: Record<string, string> = {
    Quick_Attack: '/assets/sfx/Quick_Attack.mp3',
};

const ActionMenu = ({ isVisible, type, onSpell, detailScreen }: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.currentTurn && char.isSelected);
    const [, setSelectedSpell] = useAtom(selectedSpellAtom);

    const handleSpellClick = (spell: string) => {
        setSelectedSpell(spell); // Store the selected spell
        
        const audioSrc = spellAudio[spell];
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play();
        }
    };

    return (
        isVisible && (
            <div className={`action-menu-container ${type}`}>
                {selectedCharacters.map((char) => (
                    char.currentTurn ? (
                        <div key={char.id} className="action-menu-item">
                            {char.spells.map((spell, index) => (
                                spell.includes('_Char') && type === 'character' ? (
                                    <button 
                                        key={`${char.id}-${index}`}
                                        className="action-menu-button"
                                        onClick={() => {
                                            onSpell();
                                            handleSpellClick(spell);
                                        }}
                                        data-spell={spell}
                                        disabled={char.mana < Number(spell.split('Char_')[1])} 
                                    >
                                        {spell.replace('_', ' ').replace('_', ' ').split('Char')[0]}
                                    </button>
                                ) : spell.includes('_Tar') && type === 'enemy' ? ( 
                                    <button 
                                        key={`${char.id}-${index}`}
                                        className="action-menu-button"
                                        onClick={() => {
                                            onSpell();
                                            handleSpellClick(spell);
                                        }}
                                        data-spell={spell}
                                        disabled={char.mana < Number(spell.split('*')[1])}  
                                    >
                                        {spell.replace('_', ' ').replace('_', ' ').split('Tar')[0]}
                                </button>
                                ) 
                                : null
                            ))}
                            <button className="action-menu-button" onClick={detailScreen}>Details</button>
                        </div> 
                    ) : null
                ))}
            </div>
        )
    );
};

export default ActionMenu;
