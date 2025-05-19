import { useAtom } from 'jotai';
import CharacterAtom, { CharacterType } from '../../../atom/CharacterAtom';
import { selectedSpellAtom } from '../../../atom/SelectedSpellAtom';
import attacks from '../../../gameData/spellData/attacks/Attacks';
import buffs from '../../../gameData/spellData/defense/BuffsFactory';
import { EnemyType } from '../../../atom/BaseEnemyAtom';
import SoundManager from '../../../gameData/SoundManager';
import { playerTargetAtom } from '../../../atom/PlayerTargetAtom';
import Resistances from '../../../gameData/Resistances';
import Vulnerabilites from '../../../gameData/Vulnerabilities';
import { useTutorialManager } from '../../../routes/tutorial/useTutorialManager';
import { getTutorialStep } from '../../../routes/tutorial/getTutorialStep';
import styles from '../Entity.module.css';
import SpellButton from './SpellButton';
import TargetSpellButton from './TargetSpellButton';

type ActionMenuProps = {
    isVisible: boolean;
    type: 'character' | 'enemy';
    isCurrentTurn: CharacterType | EnemyType;
    onSpell: () => void;
    detailScreen: () => void;
};

const ActionMenu = ({
    isVisible,
    type,
    onSpell,
    detailScreen,
    isCurrentTurn,
}: ActionMenuProps) => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter((char) => char.currentTurn && char.isSelected);
    const [, setSelectedSpell] = useAtom(selectedSpellAtom);
    const [playerTarget] = useAtom(playerTargetAtom);
    const { tutorial, jumpToStep } = useTutorialManager();
    const skipStep = getTutorialStep(16);

    let isClick = {};
    if (!tutorial.isTutorial) {isClick = { 'data-tutorial-clickable': false };}
    if (tutorial.isTutorial && tutorial.isTutorialClickable) {isClick = { 'data-tutorial-clickable': tutorial.isTutorialClickable };}

    const handleSpellClick = (spell: string) => {
        setSelectedSpell(spell);
        SoundManager.playSfx(spell);

        if (tutorial.isTutorial && skipStep) {
            jumpToStep(17);
        }
    };

    return (
        isVisible && (
            <div
                className={`${styles.actionMenuContainer}`}
                data-type={type}
                {...(tutorial.isTutorial && {'data-tutorial-layer': 'top'})}
            >
                {selectedCharacters.map((char) =>
                    char.currentTurn ? (
                        <div key={char.id} className={styles.actionMenuItem}>
                            {char.spells.map((spell, index) => {
                                const element = attacks[spell]?.element || buffs[spell]?.element || '';
                                const isSelf = buffs[spell]?.isSelfBuff;
                                const spellDamage = Math.round(char.attack * (attacks[spell]?.damageMulitplier ?? 0));
                                const aoeAttack = attacks[spell]?.aoe;
                                const aoeDefense = buffs[spell]?.isAoe;

                                if (isCurrentTurn.id !== char.id && isSelf) return null;

                                const buttonProps = {
                                    className: `${styles.actionMenuButton}`,
                                    onClick: () => {onSpell(); handleSpellClick(spell);},
                                    'data-spell': spell,
                                    disabled: char.mana < Number(spell.split('$')[1]) || Object.keys(isClick).length === 0,...isClick};

                                const label = attacks[spell]?.name || buffs[spell]?.name;

                                if (spell.includes('_Char') && type === 'character') {
                                    const costLabel = buffs[spell].cost === 0 ? 'Free' : '';
                                    const displayCost = Math.abs(buffs[spell].cost ?? 0);
                                    const statValue = buffs[spell]?.statValue;
                                    const isMoreInfo = buffs[spell]?.isMoreInfo;
                                    const additionalInfo = buffs[spell]?.additionalInfo;

                                    if (isSelf && !char.id) {
                                        return null;
                                    } else {
                                        return (
                                            <SpellButton
                                                key={`${char.id}-${index}`}
                                                spell={spell}
                                                char={char}
                                                index={index}
                                                buttonProps={buttonProps}
                                                label={label}
                                                element={element}
                                                costLabel={costLabel}
                                                displayCost={costLabel !== 'Free' ? ` ${displayCost}` : ''}
                                                statValue={statValue}
                                                isMoreInfo={isMoreInfo}
                                                additionalInfo={additionalInfo}
                                                aoeDefense={aoeDefense}
                                                onSpell={onSpell}
                                                handleSpellClick={handleSpellClick}
                                            />
                                        );
                                    }
                                }

                                if (spell.includes('_Tar') && type === 'enemy') {
                                    const costLabel = attacks[spell].cost < 0 ? '+' : '';
                                    const displayCost = Math.abs(attacks[spell].cost);

                                    const hasResistance = !!playerTarget?.resistances.find((res) => res.type === element);
                                    const resistanceValue = hasResistance
                                        ? Resistances[element]?.value ?? 0
                                        : 0;

                                    const hasVulnerability = !!playerTarget?.vulnerabilities.find((vul) => vul.type === element);
                                    const vulnerabilityValue = hasVulnerability
                                        ? Vulnerabilites[element]?.value ?? 0
                                        : 0;

                                    let defense = playerTarget?.defense ?? 0;
                                    if (element !== 'Physical') defense = 0;

                                    const rawAdjusted = spellDamage + vulnerabilityValue - resistanceValue;
                                    const adjustedDamage = Math.max(5,Math.round(rawAdjusted - defense));

                                    return (
                                        <TargetSpellButton
                                            key={`${char.id}-${index}`}
                                            spell={spell}
                                            char={char}
                                            index={index}
                                            buttonProps={buttonProps}
                                            label={label}
                                            element={element}
                                            costLabel={costLabel}
                                            displayCost={`${displayCost}`}
                                            adjustedDamage={adjustedDamage}
                                            vulnerability={vulnerabilityValue}
                                            resistance={resistanceValue}
                                            aoeAttack={aoeAttack}
                                            onSpell={onSpell}
                                            handleSpellClick={handleSpellClick}
                                            hasVulnerability={hasVulnerability}
                                            hasResistance={hasResistance}
                                        />
                                    );
                                }

                                return null;
                            })}
                            <button className={styles.actionMenuButton} onClick={detailScreen}>Details</button>
                        </div>
                    ) : null
                )}
        </div>
        )
    );
};

export default ActionMenu;