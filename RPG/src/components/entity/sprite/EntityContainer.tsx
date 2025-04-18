
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import Name from "../Name";

type Entity = CharacterType | EnemyType;

type EntityContainerProps = {
    entity: Entity;
    type: 'character' | 'enemy';
    index: number;
    onClick: () => void;
    children: React.ReactNode;
};

const EntityContainer: React.FC<EntityContainerProps> = ({
    entity,
    type,
    index,
    onClick,
    children,
}) => {
    const isDead = type === 'enemy' && 'health' in entity && entity.health <= 0;

    const className = `entity-container ${entity.type}${isDead ? ' dead' : ''}`;

    const gridColumn = type === 'character'
        ? (index % 2 === 0 ? 4 : 5)
        : (index % 2 === 0 ? 16 : 17);

    const gridRow = ((index + 5) * 2) + 1;

    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                position: 'relative',
                gridColumn,
                gridRow,
            }}
        >
            <Name entity={entity} />
            {children}
        </div>
    );
};

export default EntityContainer;
