
import { CharacterType } from "../../../atom/CharacterAtom";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterDisplay from "./CharacterDisplay";
import EnemyDisplay from "./EnemyDisplay";

type Entity = CharacterType | EnemyType;

type Props = {
    entity: Entity;
    type: 'character' | 'enemy';
    onTarget: (entity: Entity) => void;
};

const EntityDisplayWrapper: React.FC<Props> = ({ entity, type, onTarget }) => {
    return (
        <div onClick={() => onTarget(entity)}>
            {type === 'character' ? (
                <CharacterDisplay character={entity as CharacterType} />
            ) : (
                <EnemyDisplay enemy={entity as EnemyType} />
            )}
        </div>
    );
};

export default EntityDisplayWrapper;
