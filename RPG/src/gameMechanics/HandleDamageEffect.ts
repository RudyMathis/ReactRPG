import { DamageEffectAtom } from "../atom/effects/DamageEffectAtom";
import { storeAtom } from "../atom/storeAtom";

export const HandleDamageEffect = (
    damage: number,
    type: string,
    target: "player" | "npc",
    entityId: number
) => {
    storeAtom.set(DamageEffectAtom, (prev) => {
        const current = prev[entityId] || {
            effects: [],
            target,
            isDisplay: false,
        };

        // Check if this damage type already exists
        const existingEffectIndex = current.effects.findIndex(e => e.type === type);

        let updatedEffects;
        if (existingEffectIndex !== -1) {
            // If the effect already exists, sum the damage
            updatedEffects = [...current.effects];
            updatedEffects[existingEffectIndex] = {
                ...updatedEffects[existingEffectIndex],
                damage: updatedEffects[existingEffectIndex].damage + damage,
            };
        } else {
            // Otherwise, just add the new effect
            updatedEffects = [...current.effects, { damage, type }];
        }

        const newEffects = {
            ...prev,
            [entityId]: {
                effects: updatedEffects,
                target,
                isDisplay: true,
            }
        };

        // Schedule cleanup for this entity only
        setTimeout(() => {
            storeAtom.set(DamageEffectAtom, (finalPrev) => ({
                ...finalPrev,
                [entityId]: {
                    ...finalPrev[entityId],
                    effects: [],
                    isDisplay: false,
                }
            }));
        }, 1000);
        
        return newEffects;
    });
};