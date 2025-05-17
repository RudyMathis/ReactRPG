import TutorialData from './TutorialDataNew.json';

const tutorialSteps = TutorialData.Tutorial;

export const getTutorialStep = (id: number) => {
    const step = tutorialSteps[id];
    if (!step) return null;

    return {
        tutorialId: id,
        tutorialText: step.text,
        isTutorial: true,
        isStartTutorial: id === 0,
        isEndTutorial: id === tutorialSteps.length - 1,
        isPrevTutorial: !!step.isPrev,
        isNextTutorial: !!step.isNext,
        isTutorialClickable: !!step.isClickable,
        isTutorialVisible: !!step.isTutorialVisible,
        tutorialLayer: step.tutorialLayer as 'layer1' | 'layer2' | 'layer3' | 'layer4',
        tutorialOverlayType: step.overlayType as 'top' | 'bottom' | 'left' | 'right' | 'center' | 'all',
        tutorialTextPosition: step.textPosition as 'top' | 'bottom' | 'left' | 'right' | 'center' | 'all',
    };
};
