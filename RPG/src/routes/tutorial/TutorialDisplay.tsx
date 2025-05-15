import { useEffect, useState } from 'react';
import Btn from '../../components/ui/Btn';
import styles from './Tutorial.module.css';
import TutorialData from './TutorialData.json';
import { useAtom } from 'jotai';
import { tutorialAtom } from '../../atom/TutorialAtom';

const TutorialDisplay = () => {
    const Tutorial = TutorialData;
    const [highlight, setHighlight] = useState(Tutorial.Tutorial[0].id);
    const [text, setText] = useState(Tutorial.Tutorial[0].text);
    const [textPosition, setTextPosition] = useState(Tutorial.Tutorial[0].textPosition);
    const [position, setPosition] = useState(Tutorial.Tutorial[0].position);
    const [tutorial, setTutorial] = useAtom(tutorialAtom);
    const hidePrev = Tutorial.Tutorial[highlight].hidePrev;
    const hideNext = Tutorial.Tutorial[highlight].hideNext;
    const isHighlight = tutorial?.isHighlight;

    useEffect(() => {
        // Initialize tutorial on mount
        if(tutorial?.isTutorial === false) return
        setTutorial({
            isTutorial: true,
            front: Tutorial.Tutorial[0].front,
            isHighlight: false,
            isNextPhase: false,
            isNextTurn: false,
            isStartTutorial: false,
            isEndTutorial: false,
            isClick: false,
            isDisabled: false,
        });
    }, []);

    const handlePrev = () => {
        if(highlight === 0) return
        setHighlight(highlight - 1);
        setText(Tutorial.Tutorial[highlight - 1].text);
        setPosition(Tutorial.Tutorial[highlight - 1].position);
        setTextPosition(Tutorial.Tutorial[highlight - 1].textPosition);
        setTutorial(prev => ({
            ...(prev || { isTutorial: true }),
            front: Tutorial.Tutorial[highlight - 1].front,
        }));
    }
    const handleNext = () => {
        if(highlight === Tutorial.Tutorial.length - 1) return
        setHighlight(highlight + 1);
        setText(Tutorial.Tutorial[highlight + 1].text);
        setPosition(Tutorial.Tutorial[highlight + 1].position);
        setTextPosition(Tutorial.Tutorial[highlight + 1].textPosition);
        setTutorial(prev => ({
            ...(prev || { isTutorial: true }),
            front: Tutorial.Tutorial[highlight + 1].front,
        }));

        if(highlight === 13){
            setTutorial(prev => ({
                ...(prev || { isTutorial: true }),
                isDisabled: false,
            }));
        }
    }

    const jumpToStep = (id: number) => {
        setHighlight(id);
        setText(Tutorial.Tutorial[id].text);
        setPosition(Tutorial.Tutorial[id].position);
        setTextPosition(Tutorial.Tutorial[id].textPosition);
        if(id === 6){
            setTutorial(prev => ({
                ...(prev || { isTutorial: true }),
                front: Tutorial.Tutorial[id].front,
                isHighlight: true,
                isClick: false,
                isStartTutorial: false,
            }));
            console.log("JUMP 1", tutorial);
        } else if(id === 15) {
            setTutorial(prev => ({
                ...(prev || { isTutorial: true }),
                front: Tutorial.Tutorial[id].front,
                isHighlight: true,
                isNextPhase: false,
            }));
            console.log("JUMP 2", tutorial);
        } 
    };

    useEffect(() => {
        if (tutorial?.isStartTutorial == true) {
            jumpToStep(6);
        }
        if(tutorial?.isNextPhase == true) {
            jumpToStep(15);
        }
    }, [tutorial?.isStartTutorial, tutorial?.isNextPhase]);


    return (
        <>
            <div className={`${styles.tutorialHighlight} ${styles.blur}`} data-highlight={position} data-ishighlight={isHighlight ? 'true' : 'false'}></div>
            <div className={styles.tutorialTopClickHole} data-highlight={position} data-ishighlight={isHighlight ? 'true' : 'false'}></div>
            <div className={styles.tutorialTextContainer} data-position={textPosition}>
                <p className={styles.tutorialText}>{text}</p>
                <div className={styles.tutorialButtonContainer}>
                    {!hidePrev && <Btn onClick={handlePrev} text="Go Back"/>}
                    {!hideNext && <Btn onClick={handleNext} text="Next"/>}
                </div>
                
            </div>
        </>
    );
}

export default TutorialDisplay