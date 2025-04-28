import { CharacterType } from '../../../atom/CharacterAtom';
import BaseEntityDisplay from './BaseEntityDisplay';
import CurrentTurnArrow from '../CurrentTurnArrow';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character}) => {
    return (
        <>
            {character.currentTurn && <CurrentTurnArrow />}
            <div className={`character-sprite ${character.name}${character.health <= 0 ? ' dead' : ''}`}>
                <BaseEntityDisplay entity={character}/>
            </div>
        </>
    );
};

export default CharacterDisplay;