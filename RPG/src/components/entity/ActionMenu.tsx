import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import attacks from "../../gameData/spellData/attacks/Attacks"; // adjust path if needed
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
                            {char.spells.map((spell, index) => {
                                const element = attacks[spell]?.element || "None";
                
                                const buttonProps = {
                                    className: `action-menu-button element-${element.toLowerCase()}`,
                                    onClick: () => {
                                        onSpell();
                                        handleSpellClick(spell);
                                    },
                                    'data-spell': spell,
                                    disabled: char.mana < Number(spell.split('$')[1])
                                };
                
                                const label = spell
                                    .replace(/_/g, ' ')
                                    .split(type === 'character' ? 'Char' : 'Tar')[0]
                                    .trim();
                
                                if (spell.includes('_Char') && type === 'character') {
                                    return <button key={`${char.id}-${index}`} {...buttonProps}>{label}</button>;
                                }
                
                                if (spell.includes('_Tar') && type === 'enemy') {
                                    return <button key={`${char.id}-${index}`} {...buttonProps}>{label}</button>;
                                }
                
                                return null;
                            })}
                            <button className="action-menu-button" onClick={detailScreen}>Details</button>
                        </div>
                    ) : null
                ))}
            </div>
        )
    );
};

export default ActionMenu;
