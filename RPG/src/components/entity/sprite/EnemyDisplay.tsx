import { EnemyType } from '../../../atom/BaseEnemyAtom';
import BaseEntityDisplay from './BaseEntityDisplay';

type EnemyDisplay = {
    enemy: EnemyType;
}

const EnemyDisplay: React.FC<EnemyDisplay> = ({ enemy }) => {
    return (
        <BaseEntityDisplay entity={enemy}/>
    );
};

export default EnemyDisplay;