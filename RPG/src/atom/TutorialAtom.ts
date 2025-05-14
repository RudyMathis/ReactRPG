import { atom } from "jotai";

type Tutorial = {
    isTutorial: boolean;
    isHighlight?: boolean;
    front?: string;
};

export const tutorialAtom = atom<Tutorial | null>(null);