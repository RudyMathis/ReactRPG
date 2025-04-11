import { DamageEffectAtom } from "../atom/effects/DamageEffectAtom";
import { storeAtom } from "../atom/storeAtom";

export const HandleDamageEffect = (
    damage: number,
    type: string,
    target: "player" | "npc",
    entityId: number
) => {
    storeAtom.set(DamageEffectAtom, (prev) => {
        // If already showing damage for same entity, append
        if (prev.isDisplay && prev.entityId === entityId) {
            return {
                ...prev,
                effects: [...prev.effects, { damage, type }],
            };
        }

        setTimeout(() => {
            storeAtom.set(DamageEffectAtom, (prev) => ({
                ...prev,
                effects: [],
                isDisplay: false,
            }));
          }, 1000); // hide after 1 second

        // Otherwise, create a new damage entry
        return {
            effects: [{ damage, type }],
            target,
            entityId,
            isDisplay: true,
        };
    });
};