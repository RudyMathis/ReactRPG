import TutorialData from './TutorialData.json';

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
        tutorialEntity: step.tutorialEntity as '' | 'player' | 'npc',
        tutorialTextPosition: step.textPosition as 'top' | 'bottom' | 'left' | 'right' | 'center' | 'all',
    };
};
