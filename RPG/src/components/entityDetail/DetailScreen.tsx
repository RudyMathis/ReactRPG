import type { CharacterType } from "../../atom/CharacterAtom";
import type { EnemyType } from"../../atom/BaseEnemyAtom";
import './DetailScreen.css'

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

const DetailScreen = ({ entity }: CharacterDetailProps) => {

    return (
        <div className="popup">
            <h2>{entity.name}</h2>
            <p>Level: {entity.level}</p>
            <p>Health: {entity.health}</p>
            <p>Max Health: {entity.maxHealth}</p>
            <p>Attack: {entity.attack}</p>
            <p>Defense: {entity.defense}</p>
            <p>Speed: {entity.speed}</p>
            <p>Mana: {entity.mana}</p>
            <p>Max Mana: {entity.maxMana}</p>
            <p>Luck: {entity.luck}</p>
            {entity && entity.status.length > 0 && (
                <p>Status Effects: {entity.status.map((status, index) => (
                    <span key={index}>
                        {status.type} {status.duration && ` (Duration: ${status.duration} turns)`} 
                        {index < entity.status.length - 1 && ', '}
                    </span>
                ))}</p>
            )}

            {entity && 'exp' in entity && <p>Experience: {entity.exp}</p>}
            {entity && 'maxExp' in entity && <p>Max Experience: {entity.maxExp}</p>}
            {entity && 'gold' in entity && <p>Gold: {entity.gold}</p>}
        </div>
    );
};

export default DetailScreen;