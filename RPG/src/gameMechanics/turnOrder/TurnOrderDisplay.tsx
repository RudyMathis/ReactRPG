import {useTurnOrder} from "./useTurnOrder";
import './TurnOrderDisplay.css';

const TurnOrderDisplay = () => {
    const turnOrder = useTurnOrder();

    return (
        <div className="turn-order-container">
            {turnOrder.map((entity, index) => (
                <div key={index} className={`turn-order-item character-sprite ${entity.name} ${entity.status.includes('Dead') ? 'remove' : ''}`}>
                    {entity.name}
                </div>
            ))}
        </div>
    );
};

export default TurnOrderDisplay;