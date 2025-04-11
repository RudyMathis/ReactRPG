import {useTurnOrder} from "./useTurnOrder";
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
                const imageSrc = entityImages[entity?.name] || entityImages[(entity as EnemyType)?.base] || '/assets/default.png';
                return (
                    <div className="turn-order-portrait">
                        <div key={index} data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)} className={`turn-order-item character-sprite ${entity.name} ${entity.health <= 0 ? 'remove' : ''}`}>
                                <img src={imageSrc} className={entity.type} alt={entity.name} />
                        </div>
                        <p>{entity.name}</p>
                    </div>
                );
            })}
        </div>
    );
};


export default TurnOrderDisplay;