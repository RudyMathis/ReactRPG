import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import { CharacterType } from '../../atom/CharacterAtom';
import BaseEntityDisplay from './animation/BaseEntityDisplay';
import CurrentTurnArrow from './CurrentTurnArrow';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character}) => {

    return (
        <>
            {character.currentTurn && <CurrentTurnArrow />}
            <div className='entity-bar-container'>
                <HealthBar health={character.health <= 0 ? 0 : character.health} maxHealth={character.maxHealth} />
                {character.maxMana > 0 && <ManaBar mana={character.mana} maxMana={character.maxMana} />}
            </div>
            <div className={`character-sprite ${character.name} ${character.health <= 0 ? 'dead' : ''}`}>
                <BaseEntityDisplay entity={character}/>
            </div>
        </>
    );
};

export default CharacterDisplay;
