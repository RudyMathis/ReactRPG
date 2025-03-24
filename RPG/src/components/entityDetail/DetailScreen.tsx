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
            <p>Level: <span style={{ color: 'red'}}>{entity.level}</span> </p>
            <p>Health: <span style={{ color: 'red'}}>{entity.health <= 0 ? 0 : entity.health}</span> </p>
            <p>Max Health: <span style={{ color: 'red'}}>{entity.maxHealth}</span> </p>
            <p>Attack: <span style={{ color: 'red'}}>{entity.attack}</span> </p>
            <p>Defense: <span style={{ color: 'red'}}>{entity.defense}</span> </p>
            <p>Speed: <span style={{ color: 'red'}}>{entity.speed}</span> </p>
            <p>Mana: <span style={{ color: 'red'}}>{entity.mana}</span> </p>
            <p>Max Mana: <span style={{ color: 'red'}}>{entity.maxMana}</span> </p>
            <p>Luck: <span style={{ color: 'red'}}>{entity.luck}</span> </p>
            {entity && entity.status.length > 0 && (
                <p>Status Effects: <span style={{ color: 'red'}}>{entity.status.map((status, index) => (
                    <div key={index}>
                        {status.duration > 0 && (
                            <>
                                <span>{status.type} (Duration: {status.duration} turns)</span>
                                <span>{index < entity.status.length - 1 && ', '}</span>
                            </>
                        )}
                    </div>
                ))}</span></p>
            )}

            {entity && 'exp' in entity && <p>Experience: <span style={{ color: 'red'}}>{entity.exp}</span> </p>}
            {entity && 'maxExp' in entity && <p>Max Experience: <span style={{ color: 'red'}}>{entity.maxExp}</span> </p>}
            {entity && 'gold' in entity && <p>Gold: <span style={{ color: 'red'}}>{entity.gold}</span> </p>}
        </div>
    );
};

export default DetailScreen;