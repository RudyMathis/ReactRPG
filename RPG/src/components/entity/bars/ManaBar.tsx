import TickingNumber from '../../../components/TickingNumber';
import styles from './Bar.module.css';

type ManaBarProps = {
    mana: number;
    maxMana: number;
    resourceType: string;
}

const ManaBar: React.FC<ManaBarProps> = ({ mana, maxMana, resourceType }) => {
    
    const manaPercent = (mana / maxMana) * 100;
    let resourceColor;

    switch (resourceType) {
        case 'mana':
            resourceColor = 'dodgerblue';
            break;
        case 'energy':
            resourceColor = 'yellow';
            break;
        case 'rage':
            resourceColor = 'red';
            break;
        default:
            resourceColor = 'transparent';
            break;
    }

    return (
        <div className={styles.bar}>
                <span className={`${styles.barText} ${resourceColor}`}>
                    <TickingNumber value={mana} duration={100} />
                </span>
            <div 
                className={styles.barFill}
                style={{ width: `${manaPercent}%`, backgroundColor: manaPercent > 0 ? resourceColor : 'lightgray' }}
            >
            </div>
        </div>
    );
}

export default ManaBar;