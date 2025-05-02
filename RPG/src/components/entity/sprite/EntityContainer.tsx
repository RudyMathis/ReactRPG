
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import Name from "../Name";
import { useAtom } from "jotai";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import HealthBar from "../bars/HealthBar";
import ManaBar from "../bars/ManaBar";
import styles from'./Sprite.module.css';

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
    const isPlayerDead = type === 'character' && 'health' in entity && entity.health <= 0;
    // const weapon = entity.weapon ?? '';

    const gridColumn = type === 'character'
        ? (index % 2 === 0 ? 4 : 5)
        : (index % 2 === 0 ? 16 : 17);

    const gridRow = ((index + 5) * 2) + 1;

    return (
        <div
            className={styles.entityContainer}
            data-type={entity.type}
            onClick={onClick}
            data-is-player-dead={isPlayerDead || undefined}
            data-move={isAttacking || undefined}
            data-dead={isDead || undefined}
            style={{
                gridColumn,
                gridRow,
            }}
        >
            <div className={styles.entityInfoContainer} data-size={('size' in entity) ? entity.size : ''}>
                <Name entity={entity} />
                <div className={styles.entityBarContainer}>
                    <HealthBar health={entity.health <= 0 ? 0 : entity.health} maxHealth={entity.maxHealth} />
                    {entity.maxMana > 0 && <ManaBar mana={entity.mana} maxMana={entity.maxMana} resourceType={entity.resource_type} />}
                </div>
                {entity.debuffs.length > 0 && (
                    <div className={styles.debuffs}>
                        {entity.debuffs.map((debuff, index) => (
                            <img key={index} className={styles.debuffIcon} src={debuff.icon} />
                        ))}
                    </div>
                )}
            </div>
            {/* {weapon && 
                <img src={`/assets/weapons/${weapon}.png`} 
                    className={styles.entityWeapon} 
                    data-weapon={weapon} 
                    data-character={entity.name} 
                    data-player-dead={isPlayerDead || undefined}
                />
            } */}
            {children}
        </div>
    );
};

export default EntityContainer;