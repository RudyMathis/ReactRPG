import{ EnemyType } from "../../../atom/BaseEnemyAtom";
import{ CharacterType } from "../../../atom/CharacterAtom";;

export const Sundered = (entity: CharacterType | EnemyType) => {
    if(entity.type === "player"){
        const defense = entity.defense;
        return defense;
    } else {
        const defense = entity.defense;
        return defense;
    }
}