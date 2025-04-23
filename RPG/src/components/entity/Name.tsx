import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import styles from './Entity.module.css';

type Entity = CharacterType | EnemyType;

type NameProps = {
    entity: Entity;
};

const Name: React.FC<NameProps> = ({ entity }) => {
    const shortenName = (name: string): string => {
        const elements = ['Fire', 'Water', 'Ice', 'Dark', 'Lightning', 'Holy', 'Earth'];
        const parts = name.split(' ');

        if (elements.includes(parts[0])) {
            parts[0] = '';
        }

        return parts.join(' ');
    };

    const displayName = shortenName(entity.name).replace('_', ' ');

    return (
        <div 
            className={`${styles.spriteName}`}
            data-entity-name={`${entity.name.match(/Fire|Ice|Dark|Lightning|Holy|Earth/)}`} 
            data-type={entity.type}
        >
            {displayName}
        </div>
    );
};

export default Name;