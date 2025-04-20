import type { CharacterType } from "../../atom/CharacterAtom";
import type { EnemyType } from"../../atom/BaseEnemyAtom";
import './Entity.css'

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

const DetailScreen = ({ entity }: CharacterDetailProps) => {
    const hasDebuff = entity.debuffs.length > 0;
    const hasBuff = entity.buffs.length > 0;

    return (
        <div className="popup">
            <h2>{entity.name.replace('_', ' ')}</h2>
            <p>Level: <span className="detail-value">{entity.level}</span> </p>
            <p>Health: <span className="detail-value">{entity.health >= 0 ? entity.health : 0}</span> </p>
            <p>Max Health: <span className="detail-value">{entity.maxHealth}</span> </p>
            <p>Attack: <span className="detail-value">{entity.attack}</span> </p>
            <p>Defense: <span className="detail-value">{entity.defense}</span> </p>
            <p>Speed: <span className="detail-value">{entity.speed}</span> </p>
            <p>Mana: <span className="detail-value">{entity.mana >= 0 ? entity.mana : 0}</span> </p>
            <p>Max Mana: <span className="detail-value">{entity.maxMana}</span> </p>
            {hasDebuff && (
                <>
                    <p>Debuff:</p>
                    {entity.debuffs.map((debuff, index) => (
                        debuff.duration > 0 && (
                            <div key={index} className="detail-status">
                                {`${debuff.name} (Duration: ${debuff.duration} turns)`}
                            </div>
                        )
                    ))}
                </>
            )}
            {hasBuff && (
                <>
                    <p>Buff:</p>
                    {entity.buffs.map((buff, index) => (
                        buff.duration > 0 && (
                            <div key={index} className="detail-status">
                                {`${buff.name} (Duration: ${buff.duration} turns)`}
                            </div>
                        )
                    ))}
                </>
            )}
            {entity.resistances.length > 0 && <p>Resistances: <span className="detail-value">{entity.resistances.map(res => res.type).join(', ')}</span> </p>}
            {entity.vulnerabilities.length > 0 && <p>Vulnerabilities: <span className="detail-value">{entity.vulnerabilities.map(vuln => vuln.type).join(', ')}</span> </p>}
            {entity && 'blessings' in entity && entity.blessings.length > 0 && <p>Blessings: <span className="detail-value">{entity.blessings.length > 1 ? entity.blessings.join(', ') : entity.blessings}</span> </p>}
            {entity && 'exp' in entity && <p>Experience: <span className="detail-value">{entity.exp}</span> </p>}
            {entity && 'maxExp' in entity && <p>Max Experience: <span className="detail-value">{entity.maxExp}</span> </p>}
        </div>
    );
};

export default DetailScreen;