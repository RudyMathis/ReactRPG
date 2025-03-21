import { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";

export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    const frozenStatus = entity.status.find(s => s.type === "Frozen");
    const bleedStatus = entity.status.find(s => s.type === "Bleed");

    if (frozenStatus) {
        frozen(entity, frozenStatus);
    }

    if (bleedStatus) {
        return Bleed(entity, bleedStatus);
    } 

    return false;
};

const frozen = (entity: CharacterType | EnemyType, frozenStatus: { type: string; duration: number }) => {

    // Remove Frozen status if duration is up
    if (frozenStatus.duration <= 0) {
        entity.status = entity.status.filter(s => s.type !== "Frozen");
        frozenStatus.duration = 0;
        entity.speed = entity.speedDefault;
    }

    frozenStatus.duration -= 1;

    return true; // Return true if entity is still frozen
};

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number, damage?: number }) => {
    const damage = bleedStatus.damage || 5; // Default to 5 if no damage is set

    // Remove bleed status if duration is up
    if (bleedStatus.duration <= 0) {
        entity.status = entity.status.filter(s => s.type !== "Bleed");
        bleedStatus.duration = 0;
    } 

    // Apply damage to entity health
    entity.health -= damage;
    bleedStatus.duration -= 1;

    return true; // Return true if entity is still Bleed
};

