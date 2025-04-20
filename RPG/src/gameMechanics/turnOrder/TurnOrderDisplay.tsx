import { useTurnOrder } from "./useTurnOrder";
import './TurnOrderDisplay.css';
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { EntityImages } from "../../components/entity/sprite/EntityImages";


const TurnOrderDisplay = () => {
    const turnOrder = useTurnOrder();

    return (
        <div className="turn-order-container">
            {turnOrder.map((entity, index) => {
                const imageSrc = EntityImages[entity.name] 
                    || (entity as EnemyType)?.base && EntityImages[(entity as EnemyType).base] 
                    || '/assets/default.png';

                return (
                    <div className={`turn-order-portrait ${entity.type}${entity.health <= 0 ? ' dead' : ''}`} key={entity.id ?? index}>
                        <div
                            data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                            className={`turn-order-item character-sprite ${entity.name}`}
                        >
                            <img src={imageSrc} className={`turn-order-sprite ${entity.type} ${entity.name}`} alt={entity.name.replace('_', ' ')} />
                        </div>
                        {entity.debuffs.length > 0 && (
                            <div className="debuffs">
                                {entity.debuffs.map((debuff, index) => (
                                    <img key={index} className="debuff-icon" src={debuff.icon} />
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