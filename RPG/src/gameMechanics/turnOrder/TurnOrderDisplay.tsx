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
                            className={`${styles.turnOrderItem} ${styles.characterSprite} ${entity.name}`}
                        >
                            <img
                                src={imageSrc}
                                className={styles.turnOrderSprite}
                                data-entity-type={entity.type}
                                data-entity-name={entity.name}
                                alt={entity.name.replace('_', ' ')}
                            />
                        </div>
                        {entity.debuffs.length > 0 && (
                            <div className={styles.debuffs}>
                                {entity.debuffs.map((debuff, index) => (
                                    <img key={index} className={styles.debuffIcon} src={debuff.icon} />
                                ))}
                            </div>
                            )}
                    </div>
                );
            })}
        </div>
    );
};

export default TurnOrderDisplay;