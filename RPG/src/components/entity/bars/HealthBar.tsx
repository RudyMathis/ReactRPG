import TickingNumber from '../../../components/TickingNumber';
import styles from './Bar.module.css';

type HealthBarProps = {
    health: number;
    maxHealth: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth }) => {
    const healthPercent = (health / maxHealth) * 100;

    return (
        <div className={styles.bar}>
            <TickingNumber className={styles.barText} value={health} duration={100} />
            <div 
                className={styles.barFill}
                style={{ width: `${healthPercent}%`, backgroundColor: healthPercent == 100 ? 'limegreen' : healthPercent > 30 ? 'yellow' : 'red' }}
            >
            </div>
        </div>
    );
}

export default HealthBar;