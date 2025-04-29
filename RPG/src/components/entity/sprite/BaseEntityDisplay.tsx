import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../atom/effects/DamageEffectAtom";
import { EntityImages } from "./EntityImages";
import styles from './BaseEntityDisplay.module.css';

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

    const isAttacking = !!attackingEntities[entity.id];
    const isFlashing = !!flashEntities[entity.id];
    const isTakingDamage = !!(effectData?.isDisplay && entity.type === effectData.target);
    const shouldFlash = isFlashing || isTakingDamage;

    const key = isAttacking ? `${entity.id}-attacking` : (isFlashing ? `${entity.id}-flashing-attacking` : `${entity.id}`);
    const activeAnimation = flashEntities[entity.id];

    return (
        <>
            {effectData?.isDisplay && entity.type === effectData.target && (
                <div>
                    {effectData.effects.map((e, i) => (
                        <div key={i}>
                            <span
                                className={styles.damageEffect}
                                data-type={entity.type}
                                data-damage-type={e.type}
                                style={{
                                    animationDelay: `${(i + 1) * 1}s`,
                                    animation: `${styles.damageAnimation} 0.9s ease-out forwards`,
                                    // left: `${Math.random() * 80}px`,
                                }}
                            >
                                {e.damage}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <div className={styles.spriteGlow}></div> 
            <div className={styles.spriteContainer} data-type={entity.type}>
                {entity.health > 0 ? (
                    <>
                        <img
                            key={key}
                            src={imageSrc}
                            alt={entity.name.replace('_', ' ')}
                            data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)?.[0]}
                            data-entity-name={(entity.name).match(/Ent|Ettin|Manticore|Goblin|Rat/)?.[0]}
                            data-type={entity.type}
                            className={`
                                ${styles.sprite}
                                ${shouldFlash ? styles.flashDamage : ""}
                                ${isAttacking ? styles.attack : ""}
                            `}
                            
                        />
                        {activeAnimation && (
                            <div
                                key={`${entity.id}-animation-${activeAnimation}`}
                                className={styles.spellAnimation}
                                data-animation={`spell-${activeAnimation}`}
                            />
                        )}
                    </>
                ) : entity.type === "npc" ? (
                    <img
                        key={key}
                        src={imageSrc}
                        data-death={true}
                        alt={`${entity.name.replace('_', ' ')} is dead`}
                        data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)?.[0]}
                        data-type={entity.type}
                        data-entity-name={(entity.name).match(/Ent|Ettin|Manticore|Goblin|Rat/)?.[0]}
                        className={styles.sprite}
                    />
                ) : (
                    <img
                        src={imageSrcDead}
                        alt={`${entity.name.replace('_', ' ')} is dead`}
                        className={`${styles.spriteDeath} ${styles.deathEffect}`}
                        data-type={entity.type}
                    />
                )}
            </div>
            <img src="/assets/shadow.png" className={styles.shadow} />
        </>
    );
}

export default BaseEntityDisplay;