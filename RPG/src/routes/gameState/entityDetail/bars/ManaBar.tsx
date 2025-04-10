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
            resourceColor = 'blue';
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
            ></div>
        </div>
    );
}

export default ManaBar;