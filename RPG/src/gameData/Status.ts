import { EnemyType } from "../atom/BaseEnemyAtom";
import { CharacterType } from "../atom/CharacterAtom";


export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    const frozenStatus = entity.status.find(s => s.type === "Frozen");
    const bleedStatus = entity.status.find(s => s.type === "Bleed");

    if (frozenStatus) {
        frozen(entity, frozenStatus);
    }

    if (bleedStatus) {
        Bleed(entity, bleedStatus);
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

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number }) => {

    // Decrease duration
    bleedStatus.duration -= 1;

    // Apply damage
    entity.health -= 5;

    // Remove bleed status if duration is up
    if (bleedStatus.duration <= 0) {
        entity.status = entity.status.filter(s => s.type !== "Bleed");
        bleedStatus.duration = 0;
    }

    console.log("bleed status duration:", bleedStatus.duration, entity.health);

    return true; // Return true if entity is still Bleed
};
