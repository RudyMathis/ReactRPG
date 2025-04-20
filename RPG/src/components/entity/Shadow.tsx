
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { backgroundAtom } from "../../atom/BackgroundAtom";
import './Entity.css';
import { useAtom } from "jotai";

type Entity = CharacterType | EnemyType;

type ShadowProps = {
    entity: Entity;
    attackingEntities: { [key: string]: boolean };
};

const Shadow: React.FC<ShadowProps> = ({ entity, attackingEntities }) => {
    const [background] = useAtom(backgroundAtom);
    return (
        <div className={`shadow ${entity.type}${attackingEntities[entity.id] ? ' follow' : ''}`} data-light={background}></div>
    );
};

export default Shadow;
