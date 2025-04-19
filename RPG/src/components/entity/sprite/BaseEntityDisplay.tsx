import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import "./BaseEntityDisplay.css"; 
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../atom/effects/DamageEffectAtom";
import { EntityImages } from "./EntityImages";

type EnityDetailProps = {
    entity: CharacterType | EnemyType;
};

function BaseEntityDisplay({ entity }: EnityDetailProps) {
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const [flashEntities] = useAtom(FlashAnimationAtom);
    const [damageEffectMap] = useAtom(DamageEffectAtom);
    const effectData = damageEffectMap[entity.id];

    const imageSrc = EntityImages[entity.name] || EntityImages[(entity as EnemyType).base] || '/assets/default.png';
    const imageSrcDead = EntityImages[entity.name + '_Death'] || '/assets/default.png';

    const isAttacking = attackingEntities[entity.id] ?? false;
    const isFlashing = flashEntities[entity.id] ?? false;
    const key = isAttacking ? `${entity.id}-attacking` : (isFlashing ? `${entity.id}-flashing-attacking` : `${entity.id}`);

    return (
        <>
            {effectData?.isDisplay && entity.type === effectData.target && (
                <div>
                    {effectData.effects.map((e, i) => (
                        <div key={i} className="damage-line">
                            <span
                                className={`damage-effect ${entity.type}`}
                                data-damage-type={e.type}
                                style={{
                                    animationDelay: `${(i + 1) * 1}s`,
                                    animation: 'damageAnimation 0.9s ease-out forwards',
                                    left: `${Math.random() * 80}px`,
                                }}
                            >
                                {e.damage}
                            </span>
                        </div>
                    ))}
                </div>
            )}
    
            <div className="sprite-container">
                {entity.health > 0 ? (
                    <img 
                        key={key}
                        src={imageSrc}
                        data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                        className={`sprite ${entity.type} 
                            ${entity.name}${isAttacking ? " attack" : ""} 
                            ${isFlashing || (effectData?.isDisplay && entity.type === effectData.target)
                                ? " flash-damage"
                                : ""}`}
                        alt={entity.name.replace('_', ' ')}
                    />
                ) : entity.type === "npc" ? (
                    <img
                        key={key}
                        src={imageSrc}
                        data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                        className={`sprite ${entity.type} ${entity.name}`}
                        alt={`${entity.name.replace('_', ' ')} is dead`}
                    />
                ) : (
                    <img
                        className={`sprite_death death-effect ${entity.type}`}
                        src={imageSrcDead}
                        alt={`${entity.name.replace('_', ' ')} is dead`}
                    />
                )}
            </div>
        </>
    );
    
}

export default BaseEntityDisplay;
