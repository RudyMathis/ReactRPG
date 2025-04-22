import { atomWithStorage } from "jotai/utils";

export const HighScoreAtom = atomWithStorage<Array<[string, number, string]>>("HighScores", []);