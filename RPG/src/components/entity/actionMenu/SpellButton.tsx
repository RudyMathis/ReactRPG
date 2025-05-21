import { useAtom, useSetAtom } from "jotai";
import MoreInformationDisplay from "./MoreInformationDisplay";
import { playerTargetAtom } from "../../../atom/PlayerTargetAtom";
import { hoveredSpellAtom } from "../../../atom/HoveredSpellAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import styles from '../Entity.module.css';

type SpellButtonProps = {
    spell: string;
    char: CharacterType | EnemyType;
    index: number;
    buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
    label: string;
    element: string;
    costLabel: string;
    displayCost: string;
    statValue: number | undefined;
    isBuff: boolean | undefined;
    isMoreInfo: boolean | undefined;
    additionalInfo: string | undefined;
    aoeDefense: boolean | undefined;
    onSpell: () => void;
    handleSpellClick: (spell: string) => void;
};

const SpellButton = ({
    spell,
    char,
    index,
    buttonProps,
    label,
    element,
    costLabel,
    displayCost,
    statValue,
    isBuff,
    isMoreInfo,
    additionalInfo,
    aoeDefense,
    onSpell,
    handleSpellClick,
}: SpellButtonProps) => {
    const [playerTarget] = useAtom(playerTargetAtom);
    const setHoveredSpell = useSetAtom(hoveredSpellAtom);
    const pickedCharacters = Object.values(useAtom(CharacterAtom)[0]).filter(
        (char) => char.isSelected
    );

    return (
        <button
            key={`${char.id}-${index}`}
            {...buttonProps}
            onMouseEnter={() => {
                const targets = (!aoeDefense && playerTarget)
                    ? [playerTarget]
                    : pickedCharacters;

                const affectedEntityIds = targets.map((c) => c.id);
                const statValues = targets.map(() => statValue ?? 0);

                setHoveredSpell({
                    label,
                    affectedEntityIds,
                    statValues,
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
            {statValue && <p className={styles.spellDefense}>{statValue && !isBuff ? `${statValue}` : ``}</p>}
            {isMoreInfo && (
                <MoreInformationDisplay spellInfo={additionalInfo ?? ''} />
            )}
        </button>
    );
};

export default SpellButton;