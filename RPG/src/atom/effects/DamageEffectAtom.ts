import { atom } from "jotai";

export const DamageEffectAtom = atom<{
    [key: number]: 
    { effects: 
        { damage: number; 
            type: string 
        }[]; 
    target: "player" | "npc"; 
    isDisplay: boolean };
}>({});