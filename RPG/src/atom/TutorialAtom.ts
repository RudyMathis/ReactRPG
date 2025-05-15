import { atom } from "jotai";

type Tutorial = {
    isTutorial: boolean;
    isHighlight?: boolean;
    isStartTutorial?: boolean;
    isNextTurn?: boolean;
    isNextPhase?: boolean;
    isEndTutorial?: boolean;
    isClick?: boolean;
    isDisabled?: boolean;
    front?: string;
};

export const tutorialAtom = atom<Tutorial | null>({ isTutorial: false, isEndTutorial: false, isDisabled: false });