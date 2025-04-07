import { atom } from "jotai";

export const DamageEffectAtom = atom<{ damage: number, isDisplay: boolean, damageType: string, target: string, entityId: number }>({
    damage: 0,
    isDisplay: false,
    damageType: "",
    target: "",
    entityId: 0
});