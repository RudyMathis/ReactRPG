import { useAtomValue } from "jotai";
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { hoveredSpellAtom } from "../../atom/HoveredSpellAtom";
import styles from './Entity.module.css';

type NameProps = {
    entity: CharacterType | EnemyType;
};

const Name: React.FC<NameProps> = ({ entity }) => {
    const hoveredSpell = useAtomValue(hoveredSpellAtom);
    const isTargeted = hoveredSpell?.affectedEntityIds.includes(entity.id);

    const displayName = entity.name
        .replace('_', ' ')
        .replace('Ice', '')
        .replace('Fire', '')
        .replace('Dark', '')
        .replace('Rabid', '')
        .replace('King', '')
        .replace('Assassin', '')
        // .replace('Knight', '')
        .replace('Warlock', '')
        .replace('Ancient', '')
        .replace('Paladin', '')
        .replace('Alpha', '');

    return (
        <div 
            className={`${styles.spriteName}`}
            data-entity-name={`${entity.name.match(/Fire|Ice|Dark|Lightning|Holy|Earth/)}`} 
            data-type={entity.type}
        >
            {isTargeted && hoveredSpell?.adjustedDamage && (
                <p 
                    className={styles.targetValue}
                    data-resistance={hoveredSpell.resistance?.[hoveredSpell.affectedEntityIds.findIndex((id) => id === entity.id)]}
                    data-vulnerability={hoveredSpell.vulnerability?.[hoveredSpell.affectedEntityIds.findIndex((id) => id === entity.id)]}
                >
                    {hoveredSpell.adjustedDamage[hoveredSpell.affectedEntityIds.findIndex((id) => id === entity.id)]}
                </p>
            )}
            {isTargeted &&
                hoveredSpell?.statValues &&
                hoveredSpell.affectedEntityIds.includes(entity.id) && (
                    (() => {
                        const index = hoveredSpell.affectedEntityIds.findIndex(
                            (id) => id === entity.id
                        );
                        const value = hoveredSpell.statValues[index];
                        return value !== 0 ? (
                            <p className={styles.targetValue}>{value}</p>
                        ) : null;
                    })()
                )
            }

            {entity.type === 'player' ? entity.name : displayName}
        </div>
    );
};

export default Name;