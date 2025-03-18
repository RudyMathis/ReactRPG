import './Bar.css';

type ManaBarProps = {
    mana: number;
    maxMana: number;
}

const ManaBar: React.FC<ManaBarProps> = ({ mana, maxMana }) => {
    const manaPercent = (mana / maxMana) * 100;

    return (
        <div className="bar">
            <div 
                className="bar-fill"
                style={{ width: `${manaPercent}%`, backgroundColor: manaPercent > 0 ? 'blue' : 'lightgray' }}
            ></div>
        </div>
    );
}

export default ManaBar;