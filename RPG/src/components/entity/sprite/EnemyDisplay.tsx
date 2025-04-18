import HealthBar from '../bars/HealthBar';
import ManaBar from '../bars/ManaBar';
import { EnemyType } from '../../../atom/BaseEnemyAtom';
import BaseEntityDisplay from './BaseEntityDisplay';
import { AttackAnimationAtom } from '../../../atom/effects/AttackAnimationAtom';
import { useAtom } from 'jotai';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const isAttacking = attackingEntities[enemy.id] ?? false;
    return (
        <>
            <div className={`entity-bar-container ${enemy.type}${isAttacking ? ' attack-move' : ''}`}>
                <HealthBar health={enemy.health <= 0 ? 0 : enemy.health} maxHealth={enemy.maxHealth} />
                {enemy.maxMana > 0 && <ManaBar mana={enemy.mana} maxMana={enemy.maxMana} resourceType={enemy.resource_type} />}
            </div>
            <div className={`character-sprite ${enemy.type}${isAttacking ? ' attack-move' : ''} ${enemy.name}${enemy.health <= 0 ? ' dead' : ''}`}>
                <BaseEntityDisplay entity={enemy}/>
            </div>
        </>
    );
};

export default EnemyDisplay;
