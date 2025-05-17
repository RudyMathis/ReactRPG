import { atom } from "jotai";

type Tutorial = {
    tutorialId: number;
    tutorialText: string;
    isTutorial: boolean;
    isStartTutorial: boolean;
    isEndTutorial: boolean;
    isPrevTutorial: boolean;
    isNextTutorial: boolean;
    isTutorialClickable: boolean;
    isTutorialVisible: boolean,
    tutorialLayer: 'layer1' | 'layer2' | 'layer3' | 'layer4';
    tutorialOverlayType: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'all';
    tutorialTextPosition: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'all';
};

export const tutorialAtom = atom<Tutorial>(
    { 
        tutorialId: 0,
        tutorialText: 'Welcome to Sacred Loop! In this tutorial you will learn the basics!',
        isTutorial: false, 
        isStartTutorial: true, 
        isEndTutorial: false, 
        isPrevTutorial: false,
        isNextTutorial: true,
        isTutorialClickable: false,
        isTutorialVisible: true,
        tutorialLayer: 'layer1',
        tutorialOverlayType: 'all',
        tutorialTextPosition: 'all',
    }
);