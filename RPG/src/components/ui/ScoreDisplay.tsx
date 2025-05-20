import { useAtomValue } from 'jotai';
import { ScoreAtom } from '../../atom/persistant/ScoreAtom';
import styles from './UI.module.css';
import { storeAtom } from '../../atom/storeAtom';

const ScoreDisplay = () => {
    const score = useAtomValue(ScoreAtom);
    const storedScore = localStorage.getItem('Score');

    if(storedScore === '0') {
        storeAtom.set(ScoreAtom, 0);
    }

    return (
        <div className={styles.scoreContainer}>
            <h2>Score</h2>
            <h2>{String(score).padStart(5, '0')}</h2> 
        </div>
    );
};

export default ScoreDisplay;