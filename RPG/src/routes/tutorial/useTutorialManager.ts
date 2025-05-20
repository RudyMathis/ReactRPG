import { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';
import TutorialData from './TutorialData.json';
import { getTutorialStep } from './getTutorialStep';

const tutorialSteps = TutorialData.Tutorial;

export const useTutorialManager = () => {
  const [tutorial, setTutorial] = useAtom(tutorialAtom);

    useEffect(() => {
      const savedTutorial = localStorage.getItem('tutorialState');
      if (savedTutorial) {
        try {
          const parsed = JSON.parse(savedTutorial);
          if (parsed?.isTutorial) {
            setTutorial(parsed);
          }
        } catch (err) {
          console.error("Failed to parse saved tutorial state", err);
        }
      }
  }, [setTutorial]);

  const setStep = useCallback((id: number) => {
    const stepData = getTutorialStep(id);
    if (!stepData) return;
    setTutorial(stepData);
  }, [setTutorial]);

  const next = useCallback(() => {
    const nextId = tutorial.tutorialId + 1;
    if (nextId < tutorialSteps.length) setStep(nextId);
  }, [tutorial.tutorialId, setStep]);

  const prev = useCallback(() => {
    const prevId = tutorial.tutorialId - 1;
    if (prevId >= 0) setStep(prevId);
  }, [tutorial.tutorialId, setStep]);

  const jumpToStep = useCallback((id: number) => {
    if (id >= 0 && id < tutorialSteps.length) setStep(id);
    console.log("Jumping to step", id, tutorialSteps[id]);
  }, [setStep]);

  useEffect(() => {
    if (tutorial.isTutorial) {
      localStorage.setItem('tutorialState', JSON.stringify(tutorial));
    }
  }, [tutorial]);

  useEffect(() => {
    if (tutorial.isEndTutorial) {
      setTimeout(() => {
        jumpToStep(18);
        localStorage.removeItem('tutorialState');
      }, 2000)
    }
  }, [tutorial.isEndTutorial, jumpToStep]);

  return {
    tutorial,
    next,
    prev,
    jumpToStep,
  };
};