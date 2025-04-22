import { ScoreAtom } from "../atom/persistant/ScoreAtom";
import { storeAtom } from "../atom/storeAtom";

export const CalculateTurnScore = (scoreDelta: number) => {
    storeAtom.set(ScoreAtom, prev => prev + scoreDelta);
};