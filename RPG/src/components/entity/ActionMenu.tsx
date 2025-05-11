import { useAtom } from 'jotai';
import CharacterAtom from "../../atom/CharacterAtom";
import { selectedSpellAtom } from "../../atom/SelectedSpellAtom";
import attacks from "../../gameData/spellData/attacks/Attacks";
import styles from './Entity.module.css';
import buffs from '../../gameData/spellData/defense/BuffsFactory';
import { EnemyType } from '../../atom/BaseEnemyAtom';
import { CharacterType } from '../../atom/CharacterAtom';
import SoundManager from '../../gameData/SoundManager';
import MoreInformationDisplay from './MoreInformationDisplay';
import { playerTargetAtom } from '../../atom/PlayerTargetAtom';
import Resistances from '../../gameData/Resistances';
import Vulnerabilites from '../../gameData/Vulnerabilities';

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
    const [playerTarget] = useAtom(playerTargetAtom);

    
    
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
                                const spellDamage = Math.round(char.attack * (attacks[spell]?.damageMulitplier ?? 0));

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

                                const label = attacks[spell]?.name || buffs[spell]?.name;
                
                                if (spell.includes('_Char') && type === 'character') {
                                    
                                    if (isSelf && !char.id) { 
                                        return null;
                                    } else {
                                        return <button key={`${char.id}-${index}`} {...buttonProps}>
                                            {label} 
                                            <MoreInformationDisplay
                                                spellName={label}
                                                spellCost={attacks[spell]?.cost || buffs[spell]?.cost || 0}
                                                spellElement={attacks[spell]?.element || buffs[spell]?.element || ''}
                                                spellDamage={attacks[spell]?.damageMulitplier || 0}
                                            />
                                        </button>;
                                    }
                                }
                
                                if (spell.includes('_Tar') && type === 'enemy') {

                                    let resistance;
                                    if(playerTarget?.resistances.find(res => res.type === element)) {
                                        resistance = Resistances[element]?.value ?? 0;
                                    } else {
                                        resistance = 0;
                                    }

                                    let vulnerability;
                                    if(playerTarget?.vulnerabilities.find(vul => vul.type === element)) {
                                        vulnerability = Vulnerabilites[element]?.value ?? 0;
                                    } else {
                                        vulnerability = 0;
                                    }

                                    let defense = playerTarget?.defense ?? 0;

                                    if(element !== 'Physical') defense = 0;

                                    const rawAdjusted = spellDamage + vulnerability - resistance;
                                    const adjustedDamage = Math.max(5, Math.round(rawAdjusted - defense));

                                    return <button key={`${char.id}-${index}`} {...buttonProps}>
                                        {label}
                                        <MoreInformationDisplay
                                            spellName={label}
                                            spellCost={attacks[spell]?.cost || 0}
                                            spellElement={attacks[spell]?.element || ''}
                                            spellDamage={adjustedDamage || 0}
                                        />
                                    </button>;
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