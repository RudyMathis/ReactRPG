import{ EnemyType } from "../../../atom/BaseEnemyAtom";
import{ CharacterType } from "../../../atom/CharacterAtom";;
import Buffs from "../../Buffs";

export const Berserk = (entity: CharacterType | EnemyType) => {
    if(entity.type === "player"){
        // figure out how to add speed
        return Buffs.Berserk.attack; // flat bonus
    } else {
        return Buffs.Berserk.attack; // flat bonus
    }
}