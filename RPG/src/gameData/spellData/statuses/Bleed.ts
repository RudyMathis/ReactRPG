import EnemyAtom, { EnemyType } from "../../../atom/BaseEnemyAtom";
import CharacterAtom, { CharacterType } from "../../../atom/CharacterAtom";
import { storeAtom } from "../../../atom/storeAtom";
import { HandleDamageEffect } from "../../../gameMechanics/HandleDamageEffect";
import Debuffs from "../../Debuffs";

export const Bleed = (entity: CharacterType | EnemyType, bleedStatus: { type: string; duration: number; damage?: number }) => {
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
            HandleDamageEffect(damage, "Physical", "player", entity.id);
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
            HandleDamageEffect(damage, "Physical", "npc", entity.id);
            return updatedEnemy.health > 0;
        }
    }
};