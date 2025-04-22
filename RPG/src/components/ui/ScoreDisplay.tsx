import { useAtomValue } from 'jotai';
import { ScoreAtom } from '../../atom/persistant/ScoreAtom';
import TickingNumber from '../TickingNumber';
import './UI.css';

const ScoreDisplay = () => {
    const score = useAtomValue(ScoreAtom);

    return (
        <div className="score-container">
            <span className="score-text">Score:</span>
            <TickingNumber value={score} />
        </div>
    );
};

export default ScoreDisplay;