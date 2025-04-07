import EnemyAtom, { EnemyType } from "../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";
import { HandleDamageEffect } from "../gameMechanics/HandleDamageEffect";
import Debuffs from "./Debuffs";
import Resistances from "./Resistances";
import Vulnerabilites from "./Vulnerabilities";

export const handleStatusEffects = (entity: CharacterType | EnemyType) => {
    setTimeout(() => {
    }, 1000);
    
    if (entity.type === "player") {
        // const entityData = storeAtom.get(CharacterAtom)[entity.id];
        const entityData = storeAtom.get(CharacterAtom)[entity.id];
        if (!entityData) return false;

        const frozenStatus = entityData.debuffs.find(d => d.type === Debuffs.Frozen.type);
        const bleedStatus = entityData.debuffs.find(d => d.type === Debuffs.Bleed.type);
        const burnStatus = entityData.debuffs.find(d => d.type === Debuffs.Burn.type);
        const sunderedStatus = entityData.debuffs.find(d => d.type === Debuffs.Sundered.type);
    
        if (frozenStatus) {
            frozen(entityData, frozenStatus);
        }
    
        if (bleedStatus) {
            return Bleed(entityData, bleedStatus);
        } 
    
        if (burnStatus) {
            return Burn(entityData, burnStatus);
        }

        if (sunderedStatus) {
            return Sundered(entityData, sunderedStatus);
        } 
        return false;
    } else {
        const entityData = storeAtom.get(EnemyAtom)[entity.id];

        if (!entityData) return false;

        const frozenStatus = entityData.debuffs.find(d => d.type === Debuffs.Frozen.type);
        const bleedStatus = entityData.debuffs.find(d => d.type === Debuffs.Bleed.type);
        const burnStatus = entityData.debuffs.find(d => d.type === Debuffs.Burn.type);
        const sunderedStatus = entityData.debuffs.find(d => d.type === Debuffs.Sundered.type);

        if (frozenStatus) {
            frozen(entityData, frozenStatus);
        }
    
        if (bleedStatus) {
            return Bleed(entityData, bleedStatus);
        } 
    
        if (burnStatus) {
            return Burn(entityData, burnStatus);
        }

        if (sunderedStatus) {
            return Sundered(entityData, sunderedStatus);
        } 
        return false;
    }
};

const frozen = (entity: CharacterType | EnemyType, frozenStatus: { type: string; duration: number }) => {
    // If duration is up, remove the effect and reset speed
    if (frozenStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Frozen.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    speed: entity.speedDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Frozen.type),
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
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Frozen.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};

const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number; damage?: number }) => {
    if (bleedStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Bleed.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Bleed.type),
                },
            }));
        }
        return false;
    } else {
        const baseDamage = bleedStatus.damage ?? 10;
        const damage = Math.max(1, baseDamage);

        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => {
                const updatedEntity = prev[entity.id];
                const newHealth = Math.max(updatedEntity.health - damage, 0);

                const updatedDebuff = newHealth > 0
                    ? updatedEntity.debuffs.map(d => d.type === Debuffs.Bleed.type ? { ...d, duration: d.duration - 1 } : d).filter(d => d.duration > 0)
                    : updatedEntity.debuffs.filter(d => d.type !== Debuffs.Bleed.type);
                    
                return {
                    ...prev,
                    [entity.id]: {
                        ...updatedEntity,
                        health: newHealth,
                        debuffs: updatedDebuff,
                    },
                };
            });
            const updatedPlayer = storeAtom.get(CharacterAtom)[entity.id];
            console.log(entity.name, "took", damage, "damage from Bleed.", baseDamage, "baseDamage.", updatedPlayer.health, "remaining.", bleedStatus.damage);

            return updatedPlayer.health > 0;
        } else {
            storeAtom.set(EnemyAtom, (prev) => {
                const updatedEntity = prev[entity.id];
                const newHealth = Math.max(updatedEntity.health - damage, 0);

                const updatedDebuff = newHealth > 0
                    ? updatedEntity.debuffs.map(d => d.type === Debuffs.Bleed.type ? { ...d, duration: d.duration - 1 } : d).filter(d => d.duration > 0)
                    : updatedEntity.debuffs.filter(d => d.type !== Debuffs.Bleed.type);

                return {
                    ...prev,
                    [entity.id]: {
                        ...updatedEntity,
                        health: newHealth,
                        debuffs: updatedDebuff,
                    },
                };
            });
            const updatedEnemy = storeAtom.get(EnemyAtom)[entity.id];
            console.log(entity.name, "took", damage, "damage from Bleed.", updatedEnemy.health, "remaining.");
            return updatedEnemy.health > 0;
        }
    }
};

const Burn = (entity: CharacterType | EnemyType, burnStatus: { type: string; duration: number, damage?: number }) => {
    if (burnStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.filter(d => d.type !== Debuffs.Burn.type),
                },
            }));
        }
        return false;
    } else {
        const baseDamage = burnStatus.damage ?? 10;
        const fireResistance = entity.resistances.find(res => res.type === Resistances.Fire.type)?.value ?? 0;
        const fireVulnerability = entity.vulnerabilities.find(vul => vul.type === Vulnerabilites.Fire.type)?.value ?? 0;
        const multipleBurns = entity.debuffs.filter(d => d.type === Debuffs.Burn.type).length;
        const damage = Math.max(1, (baseDamage * multipleBurns) + fireVulnerability - fireResistance);
        
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuffs: prev[entity.id].debuffs
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
            const updatedPlayer = storeAtom.get(CharacterAtom)[entity.id];
            console.log(entity.name, "took", damage, "damage from Burn.", updatedPlayer.health, "remaining.");
            HandleDamageEffect(damage, "Fire", "player", entity.id);
            return true;
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    health: Math.max(prev[entity.id].health - damage, 0),
                    debuffs: prev[entity.id].debuffs
                        .map(d => d.type === Debuffs.Burn.type ? { ...d, duration: d.duration - 1 } : d)
                        .filter(d => d.duration > 0),
                },
            }));
            const updatedEnemy = storeAtom.get(EnemyAtom)[entity.id];
            console.log(entity.name, "took", damage, "damage from Burn.", updatedEnemy.health, "remaining.");
            HandleDamageEffect(damage, "Fire", "npc", entity.id);
            return true;
        }
    }
};

const Sundered = (entity: CharacterType | EnemyType, sunderedStatus: { type: string; duration: number }) => {
    // If duration is up, remove the effect and reset speed
    if (sunderedStatus.duration <= 0 || entity.health <= 0) {
        if (entity.type === "player") {
            storeAtom.set(CharacterAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    defense: entity.defenseDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Sundered.type),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    defense: entity.defenseDefault,
                    debuffs: prev[entity.id].debuffs.filter(s => s.type !== Debuffs.Sundered.type),
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
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Sundered.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        } else {
            storeAtom.set(EnemyAtom, (prev) => ({
                ...prev,
                [entity.id]: {
                    ...prev[entity.id],
                    debuffs: prev[entity.id].debuffs.map(d =>
                        d.type === Debuffs.Sundered.type ? { ...d, duration: d.duration - 1 } : d
                    ),
                },
            }));
        }
        return true;
    }
};