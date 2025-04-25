import{ EnemyType } from "../../../atom/BaseEnemyAtom";
import{ CharacterType } from "../../../atom/CharacterAtom";;

export const Frozen = (entity: CharacterType | EnemyType) => {
    if(entity.type === "player"){
        const speed = entity.speed;
        return speed;
    } else {
        const speed = entity.speed;
        return speed;
    }
}