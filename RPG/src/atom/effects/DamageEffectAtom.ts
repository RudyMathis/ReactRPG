import { atom } from "jotai";

export const DamageEffectAtom = atom<{
    effects: { damage: number; type: string }[];
    target: "player" | "npc";
    entityId: number;
    isDisplay: boolean;
}>({
    effects: [],
    target: "npc",
    entityId: 0, 
    isDisplay: false,
});