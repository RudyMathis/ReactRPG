import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import './Entity.css';

type Entity = CharacterType | EnemyType;

type NameProps = {
    entity: Entity;
};

const Name: React.FC<NameProps> = ({ entity }) => {
    const shortenName = (name: string): string => {
        const elements = ['Fire', 'Water', 'Ice', 'Dark', 'Lightning', 'Holy', 'Earth'];
        const parts = name.split(' ');

        if (elements.includes(parts[0])) {
            parts[0] = parts[0][0] + '.';
        }

        return parts.join(' ');
    };

    const displayName = shortenName(entity.name);

    return (
        <div className={`sprite-name ${entity.name}`} data-type={entity.type}>{displayName}</div>
    );
};

export default Name;
