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
            <BaseEntityDisplay entity={character}/>
        </>
    );
};

export default CharacterDisplay;