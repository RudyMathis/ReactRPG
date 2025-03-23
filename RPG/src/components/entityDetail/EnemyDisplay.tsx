import { useAtom } from 'jotai';
import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import { EnemyType } from '../../atom/BaseEnemyAtom';
import { HealthAtom } from '../../atom/HealthAtom';
import BaseEntityDisplay from './animation/BaseEntityDisplay';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {
    const [healthMap] = useAtom(HealthAtom);
    
    // Get the health value for the specific entity
    const health = healthMap[enemy.id] ?? enemy.health; // Default to 0 if health is not found
    
    return (
        <>
            <div className='entity-bar-container'>
                <HealthBar health={health <= 0 ? 0 : health} maxHealth={enemy.maxHealth} />
                {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} />}
            </div>
            <div className={`character-sprite ${enemy.name} ${health <= 0 ? 'dead' : ''}`}>
                <BaseEntityDisplay entity={enemy}/>
            </div>
        </>
    );
};

export default EnemyDisplay;
