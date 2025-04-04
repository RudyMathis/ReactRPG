import type { CharacterType } from "../../atom/CharacterAtom";
import type { EnemyType } from"../../atom/BaseEnemyAtom";
import './DetailScreen.css'

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

const DetailScreen = ({ entity }: CharacterDetailProps) => {
    const hasDebuff = entity.debuffs.length > 0;
    const hasBuff = entity.buffs.length > 0;


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
            {hasDebuff && (
                <div>
                    <p>Debuff:</p>
                    {entity.debuffs.map((debuff, index) => (
                        debuff.duration > 0 && (
                            <div key={index} style={{ color: 'red' }}>
                                {debuff.type === 'Dead' ? 'Dead' : `${debuff.type} (Duration: ${debuff.duration} turns)`}
                            </div>
                        )
                    ))}
                </div>
            )}
            {hasBuff && (
                <div>
                    <p>Buff:</p>
                    {entity.buffs.map((buff, index) => (
                        buff.duration > 0 && (
                            <div key={index} style={{ color: 'red' }}>
                                {buff.type === 'Dead' ? 'Dead' : `${buff.type} (Duration: ${buff.duration} turns)`}
                            </div>
                        )
                    ))}
                </div>
            )}
            {entity && 'blessings' in entity && entity.blessings.length > 0 && <p>Blessings: <span style={{ color: 'red'}}>{entity.blessings.length > 1 ? entity.blessings.join(', ') : entity.blessings}</span> </p>}
            {entity && 'exp' in entity && <p>Experience: <span style={{ color: 'red'}}>{entity.exp}</span> </p>}
            {entity && 'maxExp' in entity && <p>Max Experience: <span style={{ color: 'red'}}>{entity.maxExp}</span> </p>}
        </div>
    );
};

export default DetailScreen;