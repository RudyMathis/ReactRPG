import { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";


export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    const frozenStatus = entity.status.find(s => s.type === "Frozen");

    if (frozenStatus) {
        return frozen(entity, frozenStatus);
    }

return false;
};

const frozen = (entity: CharacterType | EnemyType, frozenStatus: { type: string; duration: number }) => {

    // Decrease duration
    frozenStatus.duration -= 1;

    // Remove Frozen status if duration is up
    if (frozenStatus.duration <= 0) {
        entity.status = entity.status.filter(s => s.type !== "Frozen");
        frozenStatus.duration = 0;
        entity.speed = entity.speedDefault;
    }

    return true; // Return true if entity is still frozen
};
