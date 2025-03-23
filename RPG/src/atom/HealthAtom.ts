// atom/HealthAtom.ts
import { atom } from 'jotai';

type HealthMap = Record<number, number>; // The key will be the id, and the value will be the health

// This atom will store health for both characters and enemies, identified by their unique IDs
export const HealthAtom = atom<HealthMap>({});