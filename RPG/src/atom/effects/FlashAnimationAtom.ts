import { atom } from "jotai";

// export const FlashAnimationAtom = atom<{ [key: number]: boolean, [key: string]: boolean }>({});
export const FlashAnimationAtom = atom<Record<number, string | null>>({});
