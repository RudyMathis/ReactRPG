import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    const frozenStatus = entity.debuff.find(d => d.type === "Frozen");
    const bleedStatus = entity.debuff.find(d => d.type === "Bleed");

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
        entity.debuff = entity.debuff.filter(s => s.type !== "Frozen");
        frozenStatus.duration = 0;
        entity.speed = entity.speedDefault;

        if(entity.type === "player"){
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed:  entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== "Frozen"),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed:  entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== "Frozen"),
                },
            }));
        }
    }

    frozenStatus.duration -= 1;

    return true; // Return true if entity is still frozen
};

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number, damage?: number }) => {
    const damage = bleedStatus.damage || 5; // Default to 5 if no damage is set

    // Remove bleed status if duration is up
    if (bleedStatus.duration <= 0) {
        entity.debuff = entity.debuff.filter(d => d.type !== "Bleed");
        bleedStatus.duration = 0;
    } 

    // Apply damage to entity health
    entity.health -= damage;
    bleedStatus.duration -= 1;
    console.log(entity.name, "took", damage, "damage from Bleed.", entity.health);

    return true; // Return true if entity is still Bleed
};

