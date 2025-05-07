import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import attacks from "../../gameData/spellData/attacks/Attacks";
import styles from './Entity.module.css';
import buffs from '../../gameData/spellData/defense/BuffsFactory';
import { EnemyType } from '../../atom/BaseEnemyAtom';
import { CharacterType } from '../../atom/CharacterAtom';
import SoundManager from '../../gameData/SoundManager';
type ActionMenuProps = {
    isVisible: boolean;
    type: 'character' | 'enemy';
    isCurrentTurn: CharacterType | EnemyType;
    onSpell: () => void;
    detailScreen: () => void;
};

const ActionMenu = ({ isVisible, type, onSpell, detailScreen, isCurrentTurn }: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.currentTurn && char.isSelected);
    const [, setSelectedSpell] = useAtom(selectedSpellAtom);

    const handleSpellClick = (spell: string) => {
        setSelectedSpell(spell);
        SoundManager.playSfx(spell); 
    };

    return (
        isVisible && (
            <div className={`${styles.actionMenuContainer}`} data-type={type}>
                {selectedCharacters.map((char) => (
                    char.currentTurn ? (
                        <div key={char.id} className={styles.actionMenuItem}>
                            {char.spells.map((spell, index) => {
                                const element = attacks[spell]?.element || buffs[spell]?.element || '';
                                const isSelf = buffs[spell]?.isSelfBuff;

                                if (isCurrentTurn.id !== char.id && isSelf) {
                                    return null; 
                                }

                                const buttonProps = {
                                    className: `${styles.actionMenuButton} element-${element.toLowerCase()}`,
                                    'data-element':`${element}`,
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
                                    
                                    if (isSelf && !char.id) { 
                                        return null;
                                    } else {
                                        return <button key={`${char.id}-${index}`} {...buttonProps}>{label}</button>;
                                    }
                                }
                
                                if (spell.includes('_Tar') && type === 'enemy') {
                                    return <button key={`${char.id}-${index}`} {...buttonProps}>{label}</button>;
                                }
                
                                return null;
                            })}
                            <button className={styles.actionMenuButton} onClick={detailScreen}>Details</button>
                        </div>
                    ) : null
                ))}
            </div>
        )
    );
};

export default ActionMenu;