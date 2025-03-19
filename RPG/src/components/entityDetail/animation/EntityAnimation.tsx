import "./EntityAnimation.css"; 
import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import './EntityAnimation.css'

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};
function EntityAnimation({ entity }: CharacterDetailProps) {
    return (
        <div className="sprite-container" >
            <div className={`sprite ${entity.name}`}></div>
        </div>
    );
};

export default EntityAnimation;
