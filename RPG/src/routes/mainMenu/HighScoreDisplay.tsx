import './MainMenu.css';

const HighScoreDisplay = () => {
    const highScores = localStorage.getItem('HighScores')

    if (!highScores) return null;

    let parsedScores: [string, number, string][] = [];
    try {
        parsedScores = JSON.parse(highScores);
    } catch (e) {
        console.error("Failed to parse HighScores from localStorage:", e);
        return null;
    }

    if (parsedScores.length === 0) return null;

    return (
        <>
            <h2>High Scores:</h2>
            <ul className="high-score-container">
                {parsedScores.map(([user, score, date], index) => (
                    <li key={index}>
                        <span>#{index + 1}</span>
                        <span>{user}</span>
                        <span>{score}</span>
                        <span>{date}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HighScoreDisplay;
