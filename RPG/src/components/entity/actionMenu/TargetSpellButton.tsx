import { useAtom, useSetAtom } from 'jotai';
import EnemyAtom, { EnemyType } from '../../../atom/BaseEnemyAtom';
import { CharacterType } from '../../../atom/CharacterAtom';
import { playerTargetAtom } from '../../../atom/PlayerTargetAtom';
import { hoveredSpellAtom } from '../../../atom/HoveredSpellAtom';
import { storeAtom } from '../../../atom/storeAtom';
import Resistances from '../../../gameData/Resistances';
import Vulnerabilities from '../../../gameData/Vulnerabilities';
import attacks from '../../../gameData/spellData/attacks/Attacks';

import styles from '../Entity.module.css';

type TargetSpellButtonProps = {
    spell: string;
    char: CharacterType | EnemyType;
    index: number;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    label: string;
    element: string;
    costLabel: string;
    displayCost: string;
    adjustedDamage: number;
    vulnerability: number;
    resistance: number;
    aoeAttack: boolean | undefined;
    onSpell: () => void;
    handleSpellClick: (spell: string) => void;
    hasVulnerability: boolean;
    hasResistance: boolean;
};

const TargetSpellButton = ({
    spell,
    char,
    index,
    buttonProps,
    label,
    element,
    costLabel,
    displayCost,
    adjustedDamage,
    aoeAttack,
    onSpell,
    handleSpellClick,
    hasVulnerability,
    hasResistance,
}: TargetSpellButtonProps) => {
    const [playerTarget] = useAtom(playerTargetAtom);
    const setHoveredSpell = useSetAtom(hoveredSpellAtom);
    const enemies = Object.values(storeAtom.get(EnemyAtom));
    const sortedEnemies = [...enemies].sort((a, b) => a.order - b.order);
    const enemyIndex = sortedEnemies.findIndex((e) => e.id === playerTarget?.id);
    const prevEnemy = enemyIndex > 0 ? sortedEnemies[enemyIndex - 1] : null;
    const enemy = sortedEnemies.find((e) => e.id === playerTarget?.id);
    const nextEnemy =
        enemyIndex < sortedEnemies.length - 1
        ? sortedEnemies[enemyIndex + 1]
        : null;

    return (
        <button
            key={`${char.id}-${index}`}
            {...buttonProps}
            onMouseEnter={() => {
                const calcAdjustedDamage = (target: EnemyType | undefined | null) => {
                    if (!target) return 0;
                    let defense = target.defense ?? 0;
                    if (element !== 'Physical') defense = 0;

                    const hasResistance = !!target.resistances.find(res => res.type === element);
                    const resistanceValue = hasResistance ? Resistances[element]?.value ?? 0 : 0;

                    const hasVulnerability = !!target.vulnerabilities.find(vul => vul.type === element);
                    const vulnerabilityValue = hasVulnerability ? Vulnerabilities[element]?.value ?? 0 : 0;

                    const spellDamage = Math.round(char.attack * (attacks[spell]?.damageMulitplier ?? 0));
                    const rawAdjusted = spellDamage + vulnerabilityValue - resistanceValue;
                    return Math.max(5, Math.round(rawAdjusted - defense));
                };

                let targets: EnemyType[] = [];

                if (!aoeAttack && enemy) {
                    targets = [enemy];
                } else if (label === 'Multi Shot' && enemy) {
                    targets = [prevEnemy, enemy, nextEnemy].filter(Boolean) as EnemyType[];
                } else if (label === 'Cleave' && enemy) {
                    targets = [enemy, nextEnemy].filter(Boolean) as EnemyType[];
                } else {
                    targets = enemies;
                }

                const affectedEntityIds = targets.map(e => e.id);
                const adjustedDamages = targets.map(e => calcAdjustedDamage(e));

                setHoveredSpell({
                    label,
                    affectedEntityIds,
                    adjustedDamage: adjustedDamages,
                    vulnerability: targets.map(e => !!e.vulnerabilities.find(vul => vul.type === element)),
                    resistance: targets.map(e => !!e.resistances.find(res => res.type === element)),
                });
            }}

            onMouseLeave={() => setHoveredSpell(null)}
            onClick={() => {
                setHoveredSpell(null);
                onSpell();
                handleSpellClick(spell);
            }}
        >
            <div className={styles.spellInfo}>
                <p data-element={`${element}`} className={styles.spellName}>{label}</p>
                <p className={styles.spellCost}>{costLabel}{displayCost}</p>
            </div>
            <p
                data-vulnerability={hasVulnerability}
                data-resistance={hasResistance}
                className={styles.spellDamage}
            >
                {adjustedDamage}
            </p>
        </button>
    );
};

export default TargetSpellButton;