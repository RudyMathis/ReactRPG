import { EnemyType } from '../../../atom/BaseEnemyAtom';
import BaseEntityDisplay from './BaseEntityDisplay';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {

    return (
        <div className={`character-sprite ${enemy.name}${enemy.health <= 0 ? ' dead' : ''}`}>
            <BaseEntityDisplay entity={enemy}/>
        </div>
    );
};

export default EnemyDisplay;
