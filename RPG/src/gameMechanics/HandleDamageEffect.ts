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

        const newEffects = {
            ...prev,
            [entityId]: {
                effects: [...current.effects, { damage, type }],
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
        }, 0);

        return newEffects;
    });
};