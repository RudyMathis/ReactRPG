import TickingNumber from '../../../components/TickingNumber';
import './Bar.css';

type HealthBarProps = {
    health: number;
    maxHealth: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth }) => {
    const healthPercent = (health / maxHealth) * 100;

    return (
        <div className="bar">
            <div 
                className="bar-fill"
                style={{ width: `${healthPercent}%`, backgroundColor: healthPercent == 100 ? 'limegreen' : healthPercent > 30 ? 'yellow' : 'red' }}
            >
                <TickingNumber className="bar-text" value={health} duration={100} />
            </div>
        </div>
    );
}

export default HealthBar;
