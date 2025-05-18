import { useTurnOrder } from "./useTurnOrder";
import styles from './TurnOrder.module.css';
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { EntityImages } from "../../components/entity/sprite/EntityImages";

const TurnOrderDisplay = () => {
    const turnOrder = useTurnOrder(); 

    return (
        <div className={styles.turnOrderContainer}>
            {turnOrder.map((entity, index) => {
                const imageSrc = EntityImages[entity.name] 
                    || (entity as EnemyType)?.base && EntityImages[(entity as EnemyType).base] 
                    || '/assets/default.png';

                return (
                    <div className={`${styles.turnOrderPortait} ${entity.type}${entity.health <= 0 ? ` ${styles.dead}` : ''}`} key={entity.id ?? index}>
                        <div
                            data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                            data-entity-type={entity.type}
                            className={`${styles.turnOrderItem} ${styles.turnOrderSpriteContainer}`}
                        >
                            <img
                                src={imageSrc}
                                className={styles.turnOrderSprite}
                                data-entity-type={entity.type}
                                data-entity-name={entity.name}
                                data-entity-size={('size' in entity) ? entity.size : ''}
                                alt={entity.name.replace('_', ' ')}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TurnOrderDisplay;