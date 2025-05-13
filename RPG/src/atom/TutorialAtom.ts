import { atom } from "jotai";

type Tutorial = {
    isTutorial: boolean;
    front?: string;
};

export const tutorialAtom = atom<Tutorial | null>(null);