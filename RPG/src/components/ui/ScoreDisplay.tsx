import { useAtomValue } from 'jotai';
import { ScoreAtom } from '../../atom/persistant/ScoreAtom';
import TickingNumber from '../TickingNumber';
import styles from './UI.module.css';

const ScoreDisplay = () => {
    const score = useAtomValue(ScoreAtom);

    return (
        <div className={styles.scoreContainer}>
            <span>Score:</span>
            <TickingNumber value={score} />
        </div>
    );
};

export default ScoreDisplay;