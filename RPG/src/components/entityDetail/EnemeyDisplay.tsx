import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import DetailScreen from './DetailScreen';
import { EnemyType } from '../../atom/BaseEnemyAtom';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {
    
    
    return (
        <div>
            <HealthBar health={enemy.health <= 0 ? 0 : enemy.health} maxHealth={enemy.maxHealth} />
            {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} />}
            <div className={`character-sprite ${enemy.name} ${enemy.health <= 0 ? 'dead' : ''}`}>
                {enemy.name.slice(0, 3)}
                <DetailScreen entity={enemy} />
            </div>
        </div>
    );
};

export default EnemyDisplay;
