import { useAtom } from 'jotai';
import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import { CharacterType } from '../../atom/CharacterAtom';
import { HealthAtom } from '../../atom/HealthAtom';
import BaseEntityDisplay from './animation/BaseEntityDisplay';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character}) => {
    const [healthMap] = useAtom(HealthAtom);
    
    const health = healthMap[character.id] ?? character.health;

    return (
        <>
            <div className='entity-bar-container'>
                <HealthBar health={health <= 0 ? 0 : health} maxHealth={character.maxHealth} />
                {character.maxMana > 0 && <ManaBar mana={character.mana} maxMana={character.maxMana} />}
            </div>
            <div className={`character-sprite ${character.name} ${health <= 0 ? 'dead' : ''}`}>
                <BaseEntityDisplay entity={character}/>
            </div>
        </>
    );
};

export default CharacterDisplay;
