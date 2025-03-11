import { useAtom } from 'jotai';
import CharacterAtom from '../../atom/CharacterAtom';
import EnemyAtom from '../../atom/BaseEnemyAtom';
import './Grid.css';

// Simple shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const Grid = () => {
    const [characters] = useAtom(CharacterAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.selected);

    const [enemies] = useAtom(EnemyAtom);
    const shuffledEnemies = shuffleArray(Object.values(enemies));

    return (
        <div className="board">
            {selectedCharacters.map((char, index) => (
                <div
                    key={char.id}
                    className="character-sprite"
                    id={char.name}
                    style={{
                        gridColumn: (index % 2) === 0 ? 2 : 3, // Even index → Column 2, Odd index → Column 3
                        gridRow: (index * 2) + 1 // Skips a row each time
                    }}
                >
                    {char.name.slice(0, 3)}
                </div>
            ))}
            {shuffledEnemies.map((enemy, index) => (
                <div
                    key={enemy.id}
                    className="character-sprite"
                    id={enemy.name}
                    style={{
                        gridColumn: (index % 2) === 0 ? 18 : 19,
                        gridRow: ((index + 1) * 2) - 1
                    }}
                >
                    {enemy.name.slice(0, 3)}
                </div>
            ))}
        </div>
    );
};

export default Grid;
