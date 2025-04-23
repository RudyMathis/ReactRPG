
import { EnemyType } from "../../atom/BaseEnemyAtom";
import { CharacterType } from "../../atom/CharacterAtom";
import { backgroundAtom } from "../../atom/BackgroundAtom";
import styles from './Entity.module.css';
import { useAtom } from "jotai";

type Entity = CharacterType | EnemyType;

type ShadowProps = {
    entity: Entity;
    attackingEntities: { [key: string]: boolean };
};

const Shadow: React.FC<ShadowProps> = ({ entity, attackingEntities }) => {
    const [background] = useAtom(backgroundAtom);
    return (
        <div className={`${styles.shadow} ${attackingEntities[entity.id] ? ` ${styles.follow}` : ''}`} 
            data-type={entity.type}
            data-light={background}></div>
    );
};

export default Shadow;