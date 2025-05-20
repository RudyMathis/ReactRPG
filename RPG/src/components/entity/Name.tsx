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
            {isTargeted && <img className={styles.targetArrow} src="/assets/select_arrow.png" alt="target arrow" />}
            {entity.type === 'player' ? entity.name : displayName}
        </div>
    );
};

export default Name;