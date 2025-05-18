import { useAtom, useSetAtom } from 'jotai';
import EnemyAtom, { EnemyType } from '../../../atom/BaseEnemyAtom';
import { CharacterType } from '../../../atom/CharacterAtom';
import { playerTargetAtom } from '../../../atom/PlayerTargetAtom';
import { hoveredSpellAtom } from '../../../atom/HoveredSpellAtom';
import { storeAtom } from '../../../atom/storeAtom';
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
                if (enemy && !aoeAttack) {
                    const affectedEntityIds = [playerTarget?.id]
                        .map((id) => id ?? 0)
                        .filter(Boolean);
                    setHoveredSpell({ label, affectedEntityIds });
                } else if (label === 'Multi Shot' && enemy) {
                    const affectedEntityIds = [
                        prevEnemy?.id,
                        enemy.id,
                        nextEnemy?.id,
                    ]
                        .map((id) => id ?? 0)
                        .filter(Boolean);
                    setHoveredSpell({ label, affectedEntityIds });
                } else if (label === 'Cleave') {
                    const affectedEntityIds = [enemy?.id, nextEnemy?.id]
                        .map((id) => id ?? 0)
                        .filter(Boolean);
                    setHoveredSpell({ label, affectedEntityIds });
                } else {
                    const affectedEntityIds = enemies.map(
                        (enemy) => enemy.id as number
                    );
                    setHoveredSpell({ label, affectedEntityIds });
                }
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