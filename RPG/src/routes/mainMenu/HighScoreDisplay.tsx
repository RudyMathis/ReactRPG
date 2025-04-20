import { ScoreAtom } from '../../atom/persistant/ScoreAtom';
import { storeAtom } from '../../atom/storeAtom';
import './MainMenu.css';

const HighScoreDisplay = () => {
    const highScores = storeAtom.get(ScoreAtom);

    if (highScores.length === 0) {
        return null;
    }

    const sortedScores = [...highScores].sort((a, b) => b[1] - a[1]).slice(0, 10);

    return (
        <>
            <h2>High Scores:</h2>
            <div>
                <ul className="high-score-container">
                {sortedScores.map(([user, score, date], index) => (
                    <li key={index}>
                        <span>#{index + 1}</span>
                        <span>{user}</span>
                        <span>{score}</span>
                        <span>{date}</span>
                    </li>
                ))}
                </ul>
            </div>
        </>
    );
};

export default HighScoreDisplay;
