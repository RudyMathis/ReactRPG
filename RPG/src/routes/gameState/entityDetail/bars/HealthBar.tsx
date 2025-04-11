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
                <span className="bar-text">{health}/{maxHealth}</span>
            </div>
        </div>
    );
}

export default HealthBar;
