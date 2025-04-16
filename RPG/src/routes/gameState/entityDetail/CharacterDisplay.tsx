import HealthBar from './bars/HealthBar';
import ManaBar from './bars/ManaBar';
import { CharacterType } from '../../../atom/CharacterAtom';
import BaseEntityDisplay from './animation/BaseEntityDisplay';
import CurrentTurnArrow from './CurrentTurnArrow';
import { AttackAnimationAtom } from '../../../atom/effects/AttackAnimationAtom';
import { useAtom } from 'jotai';

type CharacterDisplayProps = {
    character: CharacterType;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character}) => {
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const isAttacking = attackingEntities[character.id] ?? false;

    return (
        <>
            {character.currentTurn && <CurrentTurnArrow />}
            <div className={`entity-bar-container ${character.type}${isAttacking ? ' attack-move' : ''}`}>
                <HealthBar health={character.health <= 0 ? 0 : character.health} maxHealth={character.maxHealth} />
                {character.maxMana > 0 && <ManaBar mana={character.mana} maxMana={character.maxMana} resourceType={character.resource_type} />}
            </div>
            <div className={`character-sprite ${character.type}${isAttacking ? ' attack-move' : ''} ${character.name}${character.health <= 0 ? ' dead' : ''}`}>
                <BaseEntityDisplay entity={character}/>
            </div>
        </>
    );
};

export default CharacterDisplay;
