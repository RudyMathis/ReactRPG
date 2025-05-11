import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import styles from './Entity.module.css';

type Entity = CharacterType | EnemyType;

type NameProps = {
    entity: Entity;
};

const Name: React.FC<NameProps> = ({ entity }) => {

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
            {entity.type === 'player' ? entity.name : displayName}
        </div>
    );
};

export default Name;