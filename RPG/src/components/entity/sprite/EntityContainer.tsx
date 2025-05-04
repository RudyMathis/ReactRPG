
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import Name from "../Name";
import { useAtom } from "jotai";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import HealthBar from "../bars/HealthBar";
import ManaBar from "../bars/ManaBar";
import styles from'./Sprite.module.css';
import { DefenseAnimationAtom } from "../../../atom/effects/DefenseAnimationAtom";

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
    const [defendingEntities] = useAtom(DefenseAnimationAtom);
    const isDefending = defendingEntities[entity.id] ?? false;
    const isDead = type === 'enemy' && 'health' in entity && entity.health <= 0;
    const isPlayerDead = type === 'character' && 'health' in entity && entity.health <= 0;
    // const enemyCount = Object.keys(entity.enemies as Record<string, EnemyType>).length;

    const characterPositions = [
        { gridColumn: 6, gridRow: 10 },
        { gridColumn: 5, gridRow: 11 },
        { gridColumn: 7, gridRow: 11 },
        { gridColumn: 6, gridRow: 12 },
    ];

    const enemyPositionsByCount: Record<number, { gridColumn: number; gridRow: number }[]> = {
        2: [
            { gridColumn: 15, gridRow: 10 }, // top
            { gridColumn: 14, gridRow: 11 }, // left
        ],
        3: [
            { gridColumn: 15, gridRow: 10 }, // top
            { gridColumn: 14, gridRow: 11 }, // left
            { gridColumn: 16, gridRow: 11 }, // right
        ],
        4: [
            { gridColumn: 15, gridRow: 10 }, // top
            { gridColumn: 14, gridRow: 11 }, // left
            { gridColumn: 16, gridRow: 11 }, // right
            { gridColumn: 15, gridRow: 12 }, // bottom
        ]
    };
    
    let gridColumn: number;
    let gridRow: number;
    
    if (type === 'character') {
        const position = characterPositions[index] || { gridColumn: 5, gridRow: 5 };
        gridColumn = position.gridColumn;
        gridRow = position.gridRow;
    } else {
        const enemyCount = 'enemies' in entity ? Object.keys(entity.enemies as Record<string, EnemyType>).length : 0;

        const positions = enemyPositionsByCount[enemyCount] || enemyPositionsByCount[4];
        const position = positions[index] || { gridColumn: 16, gridRow: 4 };
        gridColumn = position.gridColumn;
        gridRow = position.gridRow;
    }
    
    return (
        <div
            className={styles.entityContainer}
            data-type={entity.type}
            onClick={onClick}
            data-is-player-dead={isPlayerDead || undefined}
            data-attacking={isAttacking || undefined}
            data-defending={isDefending || undefined}
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
            {children}
        </div>
    );
};

export default EntityContainer;