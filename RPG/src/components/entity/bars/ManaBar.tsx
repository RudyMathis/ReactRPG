import TickingNumber from '../../../components/TickingNumber';
import './Bar.css';

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
        <div className="bar">
                <span className={`bar-text ${resourceColor}`}>
                    <TickingNumber value={mana} duration={100} />
                </span>
            <div 
                className="bar-fill"
                style={{ width: `${manaPercent}%`, backgroundColor: manaPercent > 0 ? resourceColor : 'lightgray' }}
            >
            </div>
        </div>
    );
}

export default ManaBar;