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
                                    className: `${styles.actionMenuButton}`,
                                    onClick: () => {
                                        onSpell();
                                        handleSpellClick(spell);
                                    },
                                    'data-spell': spell,
                                    disabled: char.mana < Number(spell.split('$')[1])
                                };

                                const label = attacks[spell]?.name || buffs[spell]?.name;

                                if (spell.includes('_Char') && type === 'character') {
                                    const costLabel = buffs[spell].cost == 0 ? 'Free' : '';
                                    const displayCost = Math.abs(buffs[spell].cost ?? 0);
                                    const stat = buffs[spell]?.stat;
                                    const statValue = buffs[spell]?.statValue;
                                    const isMoreInfo = buffs[spell]?.isMoreInfo;
                                    const additionalInfo = buffs[spell]?.additionalInfo;
                                    
                                    if (isSelf && !char.id) { 
                                        return null;
                                    } else {
                                        return <button key={`${char.id}-${index}`} {...buttonProps}>
                                            <div className={styles.spellInfo}>
                                                <p data-element={`${element}`} className={styles.spellName}>{label}</p>
                                                <p className={styles.spellCost}>{costLabel}{costLabel !== 'Free' ? ` ${displayCost}` : ''}</p>
                                            </div>
                                            <p className={styles.spellDefense}>{statValue} {stat}</p>
                                            {isMoreInfo && 
                                                <MoreInformationDisplay
                                                    spellInfo={additionalInfo ?? ''}
                                                />
                                            }
                                        </button>;
                                    }
                                }
                
                                if (spell.includes('_Tar') && type === 'enemy') {
                                    const costLabel = attacks[spell].cost < 0 ? '+' : '';
                                    const displayCost = Math.abs(attacks[spell].cost);

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
                                        <div className={styles.spellInfo}>
                                            <p data-element={`${element}`} className={styles.spellName}>{label}</p>
                                            <p className={styles.spellCost}>{costLabel}{displayCost}</p>
                                        </div>
                                        <p data-vulnerability={vulnerability > 0} data-resistance={resistance > 0} className={styles.spellDamage}>{adjustedDamage}</p>
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