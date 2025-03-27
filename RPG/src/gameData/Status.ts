import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";

export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    if (entity.type === "player") {
        const entityData = storeAtom.get(CharacterAtom)[entity.id];
        if (!entityData) return false;

        const frozenStatus = entityData.debuff.find(d => d.type === "Frozen");
        const bleedStatus = entityData.debuff.find(d => d.type === "Bleed");
        const burnStatus = entityData.debuff.find(d => d.type === "Burn");
    
        if (frozenStatus) {
            frozen(entityData, frozenStatus);
        }
    
        if (bleedStatus) {
            return Bleed(entityData, bleedStatus);
        } 
    
        if (burnStatus) {
            return Burn(entityData, burnStatus);
        } 
        return false;
    } else {
        const entityData = storeAtom.get(EnemyAtom)[entity.id];
        if (!entityData) return false;

        const frozenStatus = entityData.debuff.find(d => d.type === "Frozen");
        const bleedStatus = entityData.debuff.find(d => d.type === "Bleed");
        const burnStatus = entityData.debuff.find(d => d.type === "Burn");
    
        if (frozenStatus) {
            frozen(entityData, frozenStatus);
        }
    
        if (bleedStatus) {
            return Bleed(entityData, bleedStatus);
        } 
    
        if (burnStatus) {
            return Burn(entityData, burnStatus);
        } 
        return false;
    }
};

const frozen = (entity: CharacterType | EnemyType, frozenStatus: { type: string; duration: number }) => {
    // If duration is up, remove the effect and reset speed
    if (frozenStatus.duration <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== "Frozen"),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== "Frozen"),
                },
            }));
        }
        return false;
    } else {
        // Decrement duration and update the debuff array
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.map(d =>
                        d.type === "Frozen" ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.map(d =>
                        d.type === "Frozen" ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number, damage?: number }) => {
    const damage = ((bleedStatus.damage ?? 0) - entity.defense) || 5;

    // If duration expired, remove the effect
    if (bleedStatus.duration <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== "Bleed"),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== "Bleed"),
                },
            }));
        }
        return false;
    } else {
        // Update health and decrement duration; remove effect if duration reaches 0
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: prev[entity.id].health - damage,
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === "Bleed" ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: prev[entity.id].health - damage,
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === "Bleed" ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        }
        console.log(entity.name, "took", damage, "damage from Bleed.");
        return true;
    }
};

const Burn = (entity: CharacterType | EnemyType, burnStatus: { type: string; duration: number, damage?: number }) => {
    // If duration expired, remove the effect
    if (burnStatus.duration <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== "Burn"),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== "Burn"),
                },
            }));
        }
        return false;
    } else {
        let damage = burnStatus.damage ?? 10;

        // Apply fire resistance/vulnerability
        const fireResistance = entity.resistances.find(res => res.type === "Fire");
        if (fireResistance) {
            damage = Math.max(0, damage - fireResistance.value);
        }
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === "Fire");
        if (fireVulnerability) {
            damage += fireVulnerability.value;
        }
        
        // Update health and decrement duration; remove effect if duration reaches 0
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === "Burn" ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === "Burn" ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        }
        console.log(entity.name, "took", damage, "damage from Burn.");
        return true;
    }
};
