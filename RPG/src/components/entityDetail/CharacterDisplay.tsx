import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import DetailScreen from './DetailScreen';
import { CharacterType } from '../../atom/CharacterAtom';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character}) => {

    return (
        <div>
            <HealthBar health={character.health <= 0 ? 0 : character.health} maxHealth={character.maxHealth} />
            {character.maxMana > 0 && <ManaBar mana={character.mana} maxMana={character.maxMana} />}
            <div className={`character-sprite ${character.name} ${character.health <= 0 ? 'dead' : ''}`}>
                {character.name.slice(0, 3)}
                <DetailScreen entity={character} />
            </div>
        </div>
    );
};

export default CharacterDisplay;
