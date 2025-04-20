import TickingNumber from '../TickingNumber';
import './UI.css'
const ScoreDisplay = () => {
    const score = parseInt(localStorage.getItem('Score') || '0', 10);

    return (
        <div className="score-container">
            <span className="score-text">Score:</span>
            <TickingNumber className="score-value" value={score} />
        </div>
    )
}

export default ScoreDisplay