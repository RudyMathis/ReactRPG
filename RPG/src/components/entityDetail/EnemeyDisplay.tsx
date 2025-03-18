import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import DetailScreen from './DetailScreen';
import ActionMenu from '../menu/ActionMenu';
import { EnemyType } from '../../atom/BaseEnemyAtom';

type EnemyDisplay = {
    enemy: EnemyType;
    isActive: boolean;
    toggleVisibility: () => void;
}


const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy, isActive, toggleVisibility }) => {
    return (
        <div>
            <HealthBar health={enemy.health <= 0 ? 0 : enemy.health} maxHealth={enemy.maxHealth} />
            {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} />}
            <div className={`character-sprite ${enemy.name} ${enemy.health <= 0 ? 'dead' : ''}`}>
                {enemy.name.slice(0, 3)}
                <DetailScreen entity={enemy} />
            </div>
            <div style={{ position: 'relative' }}>
                <ActionMenu isVisible={isActive} toggleVisibility={toggleVisibility} />
            </div>
        </div>
    );
};

export default EnemyDisplay;
