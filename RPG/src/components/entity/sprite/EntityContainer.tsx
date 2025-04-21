
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import Name from "../Name";
import './Sprite.css';
import { useAtom } from "jotai";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import HealthBar from "../bars/HealthBar";
import ManaBar from "../bars/ManaBar";

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
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const isAttacking = attackingEntities[entity.id] ?? false;
    const isDead = type === 'enemy' && 'health' in entity && entity.health <= 0;
    const weapon = entity.weapon ?? '';

    const className = `entity-container ${entity.type}${isAttacking ? ' attack-move' : ''}${isDead ? ' dead' : ''}`;

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
            <div className='entity-bar-container'>
                <HealthBar health={entity.health <= 0 ? 0 : entity.health} maxHealth={entity.maxHealth} />
                {entity.maxMana > 0 && <ManaBar mana={entity.mana} maxMana={entity.maxMana} resourceType={entity.resource_type} />}
            </div>
            {weapon && <img src={`/assets/weapons/${weapon}.png`} className="entity-weapon" data-weapon={weapon} />}
            {children}
        </div>
    );
};

export default EntityContainer;
