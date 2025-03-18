
import {  useAtom } from 'jotai';
import "../../gameData/characters/CharacterData.json";
import characterAtom from "../../atom/CharacterAtom";
import "./CharacterSheets.css";

const CharacterSheets = () => {
    const [characters, setCharacters] = useAtom(characterAtom);

    const handleSelect = (id: number) => {
        setCharacters((prev) => ({
            ...prev,
            
            [id]: {
                ...prev[id],
                isSelected: !prev[id].isSelected,
            }
        }));
    };
    
    return (
        <ul className="character-sheet-container">
            {Object.values(characters).map((char) => (
                <li
                    key={char.id}
                    className={`character-sheet ${char.isSelected ? 'isSelected' : ''}`}
                    onClick={() => handleSelect(char.id)}
                >
                    <h2>{char.name}</h2>
                    <p>Level: {char.level}</p>
                    <p>Health: {char.maxHealth}</p>
                    <p>Attack: {char.attack}</p>
                    <p>Defense: {char.defense}</p>
                </li>
            ))}
        </ul>
    );
};

export default CharacterSheets;
