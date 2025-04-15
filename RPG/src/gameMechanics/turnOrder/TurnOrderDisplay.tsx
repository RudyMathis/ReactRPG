import { useTurnOrder } from "./useTurnOrder";
import './TurnOrderDisplay.css';
import { EnemyType } from "../../atom/BaseEnemyAtom";

const entityImages: Record<string, string> = {
    Goblin: '/assets/characters/goblin_face.png',
};

const TurnOrderDisplay = () => {
    const turnOrder = useTurnOrder();

    return (
        <div className="turn-order-container">
            {turnOrder.map((entity, index) => {
                const imageSrc = entityImages[entity.name] 
                    || (entity as EnemyType)?.base && entityImages[(entity as EnemyType).base] 
                    || '/assets/default.png';

                return (
                    <div className="turn-order-portrait" key={entity.id ?? index}>
                        <div
                            data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                            className={`turn-order-item character-sprite ${entity.name} ${entity.health <= 0 ? 'remove' : ''}`}
                        >
                            <img src={imageSrc} className={entity.type} alt={entity.name.replace('_', ' ')} />
                        </div>
                        <p>{entity.name.replace('_', ' ')}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TurnOrderDisplay;