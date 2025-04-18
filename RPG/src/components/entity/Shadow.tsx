
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";

type Entity = CharacterType | EnemyType;

type ShadowProps = {
    entity: Entity;
    attackingEntities: { [key: string]: boolean };
};

const Shadow: React.FC<ShadowProps> = ({ entity, attackingEntities }) => {
    return (
        <div className={`shadow ${entity.type}${attackingEntities[entity.id] ? ' follow' : ''}`}></div>
    );
};

export default Shadow;
