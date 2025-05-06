import { useAtomValue } from 'jotai';
import { ScoreAtom } from '../../atom/persistant/ScoreAtom';
import TickingNumber from '../TickingNumber';
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
            <span>Score:</span>
            <TickingNumber value={score} />
        </div>
    );
};

export default ScoreDisplay;