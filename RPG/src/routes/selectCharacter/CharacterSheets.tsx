import { useAtom } from 'jotai';
import characterAtom from "../../atom/CharacterAtom";
import styles from "../Route.module.css";

const CharacterSheets = () => {
    const [characters, setCharacters] = useAtom(characterAtom);
    const charactersLockedIn = localStorage.getItem('selectedParty') === 'true';

    const handleSelect = (id: number) => {
        if (charactersLockedIn) return;

        setCharacters(prev => {
            const selectedCount = Object.values(prev).filter(char => char.isSelected).length;
            const isCurrentlySelected = prev[id].isSelected;

            if (isCurrentlySelected) {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        isSelected: false,
                    },
                };
            }

            if (selectedCount >= 4) {
                return prev;
            }

            return {
                ...prev,
                [id]: {
                    ...prev[id],
                    isSelected: true,
                },
            };
        });
    };

    return (
        <ul className={styles.characterSheetContainer}>
            {Object.values(characters).map((char) => (
                <li
                    key={char.id}
                    className={`${styles.characterSheet} ${char.isSelected ? styles.isSelected : ''}`}
                >
                    <button onClick={() => handleSelect(char.id)} disabled={charactersLockedIn}>
                        <h2>{char.name}</h2>
                        <p>Level: {char.level}</p>
                        <p>Health: {char.maxHealth}</p>
                        <p>Attack: {char.attack}</p>
                        <p>Defense: {char.defense}</p>
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default CharacterSheets;