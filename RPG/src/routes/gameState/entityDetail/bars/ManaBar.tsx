import TickingNumber from '../../../../components/TickingNumber';
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
            <div 
                className="bar-fill"
                style={{ width: `${manaPercent}%`, backgroundColor: manaPercent > 0 ? resourceColor : 'lightgray' }}
            >
                <span className={`bar-text ${resourceColor}`}>
                    <TickingNumber value={mana} duration={300} />
                </span>
            </div>
        </div>
    );
}

export default ManaBar;