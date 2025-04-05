import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import { EnemyType } from '../../atom/BaseEnemyAtom';
import BaseEntityDisplay from './animation/BaseEntityDisplay';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {

    return (
        <>
            <div className='entity-bar-container'>
                <HealthBar health={enemy.health <= 0 ? 0 : enemy.health} maxHealth={enemy.maxHealth} />
                {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} resourceType={enemy.resource_type} />}
            </div>
            <div className={`character-sprite ${enemy.name} ${enemy.health <= 0 ? 'dead' : ''}`}>
                <BaseEntityDisplay entity={enemy}/>
            </div>
        </>
    );
};

export default EnemyDisplay;
