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
    const [position, setPosition] = useState(Tutorial.Tutorial[0].position);
    // const [, setFront] = useState(Tutorial.Tutorial[0].front);
    const hideNext = Tutorial.Tutorial[highlight].hideNext;
    const [, setTutorial] = useAtom(tutorialAtom);

    useEffect(() => {
        // Initialize tutorial on mount
        setTutorial({
            isTutorial: true,
            front: Tutorial.Tutorial[0].front,
        });
    }, []);
    const handlePrev = () => {
        if(highlight === 0) return
        setHighlight(highlight - 1);
        setText(Tutorial.Tutorial[highlight - 1].text);
        setPosition(Tutorial.Tutorial[highlight - 1].position)
    }
    const handleNext = () => {
        if(highlight === Tutorial.Tutorial.length - 1) return
        setHighlight(highlight + 1);
        setText(Tutorial.Tutorial[highlight + 1].text);
        setPosition(Tutorial.Tutorial[highlight + 1].position);
        setTutorial(prev => ({
            ...(prev || { isTutorial: true }),
            front: Tutorial.Tutorial[highlight + 1].front
        }));
    }

    return (
        <>
            <div className={`${styles.tutorialHighlight} ${styles.blur}`} data-highlight={position}></div>
            <div className={styles.tutorialTopClickHole}data-highlight={position}></div>
            
            <div className={styles.tutorialContainer} data-position={position}>
                <p className={styles.tutorialText}>{text}</p>
                <div className={styles.tutorialButtonContainer}>
                    <Btn onClick={handlePrev} text="Go Back"/>
                    {!hideNext && <Btn onClick={handleNext} text="Next"/>}
                </div>
                
            </div>
        </>
    );
}

export default TutorialDisplay