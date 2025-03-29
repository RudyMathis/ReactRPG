import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../atom/CharacterAtom";
import * as store from "../atom/storeAtom";
import Debuffs from "./Debuffs";
import Resistances from "./Resistances";
import Vulnerabilites from "./Vulnerabilities";

export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    if (entity.type === "player") {
        // const entityData = storeAtom.get(CharacterAtom)[entity.id];
        const entityData = store.storeAtom.get(CharacterAtom)[entity.id];
        if (!entityData) return false;

        const frozenStatus = entityData.debuff.find(d => d.type === Debuffs.Frozen.type);
        const bleedStatus = entityData.debuff.find(d => d.type === Debuffs.Bleed.type);
        const burnStatus = entityData.debuff.find(d => d.type === Debuffs.Burn.type);
        console.log(frozenStatus, bleedStatus, burnStatus);
    
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
        // const entityData = storeAtom.get(EnemyAtom)[entity.id];
        const entityData = store.storeAtom.get(EnemyAtom)[entity.id];

        if (!entityData) return false;

        const frozenStatus = entityData.debuff.find(d => d.type === Debuffs.Frozen.type);
        const bleedStatus = entityData.debuff.find(d => d.type === Debuffs.Bleed.type);
        const burnStatus = entityData.debuff.find(d => d.type === Debuffs.Burn.type);
    
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
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== Debuffs.Frozen.type),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuff: prev[entity.id].debuff.filter(s => s.type !== Debuffs.Frozen.type),
                },
            }));
        }
        return false;
    } else {
        // Decrement duration and update the debuff array
        if (entity.type === "player") {
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number, damage?: number }) => {
    // If duration expired, remove the effect
    if (bleedStatus.duration <= 0) {
        if (entity.type === "player") {
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== Debuffs.Bleed.type),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== Debuffs.Bleed.type),
                },
            }));
        }
        return false;
    } else {
        const baseDamage = bleedStatus.damage ?? 10;
        const defense = entity.defense ?? 0;

        // Apply percentage-based damage reduction
        const damage = Math.max(1, Math.round(baseDamage * (1 / (1 + defense / 100))));

        // Update health and decrement duration
        if (entity.type === "player") {
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: prev[entity.id].health - damage,
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === Debuffs.Bleed.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev[entity.id],
                health: prev[entity.id].health - damage,
                debuff: prev[entity.id].debuff
                    .map(d => d.type === Debuffs.Bleed.type ? { ...d, duration: d.duration - 1 } : d)
                    .filter(d => d.duration > 0),
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
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuff: prev[entity.id].debuff.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        }
        return false;
    } else {
        const baseDamage = burnStatus.damage ?? 10;

        // Get fire resistance and vulnerability values (default to 0 if not found)
        const fireResistance = entity.resistances.find(res => res.type ===  Resistances.Fire.type)?.value ?? 0;
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type)?.value ?? 0;

        // Calculate final damage after resistance and vulnerability
        const damage = Math.max(1, baseDamage + fireVulnerability - fireResistance);

        // Update health and decrement duration
        if (entity.type === "player") {
            store.storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        } else {
            store.storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuff: prev[entity.id].debuff
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
        }

        console.log(entity.name, "took", damage, "damage from Burn.");
        return true;
    }
};

