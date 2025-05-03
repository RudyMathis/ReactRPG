import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../atom/effects/DamageEffectAtom";
import { EntityImages } from "./EntityImages";
import styles from './BaseEntityDisplay.module.css';
import attacks from "../../../gameData/spellData/attacks/Attacks";

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

    const attackEntry = Object.values(attacks).find(
        (attack) => attack.animation?.name === activeAnimation
    );
    
    const name = attackEntry?.animation?.name;
    const duration = attackEntry?.animation?.duration;
    const steps = attackEntry?.animation?.steps;
    const width = attackEntry?.animation?.width;
    const height = attackEntry?.animation?.height;
    const image = attackEntry?.animation?.image;
    const rotation = attackEntry?.animation?.rotation;
    const brightness = attackEntry?.animation?.brightness;

    return (
        <>
            {activeAnimation && attackEntry?.animation && (
                <div
                    key={`${entity.id}-animation-${activeAnimation}`}
                    className={styles.spellAnimation}
                    style={{
                        backgroundSize: `${width}em ${height}em`,
                        width: `calc(${width}em / ${steps})`,
                        height: `${height}em`,
                        backgroundImage: `url(${image})`,
                        animation: `${styles[name || '']} ${duration}ms steps(${steps}) forwards`,
                        filter: `hue-rotate(${rotation}deg) brightness(${brightness})`,
                    }}
                />
            )}
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
                            data-entity-size={('size' in entity) ? entity.size : ''}
                            data-type={entity.type}
                            className={`
                                ${styles.sprite}
                                ${shouldFlash ? styles.flashDamage : ""}
                                ${isAttacking ? styles.attack : ""}
                            `}
                            
                        />
                {/* {activeAnimation && attackEntry?.animation && (
                    <div
                        key={`${entity.id}-animation-${activeAnimation}`}
                        className={styles.spellAnimation}
                        style={{
                            backgroundSize: `${width}em ${height}em`,
                            width: `calc(${width}em / ${steps})`,
                            height: `${height}em`,
                            backgroundImage: `url(${image})`,
                            animation: `${styles[name || '']} ${duration}ms steps(${steps}) forwards`,
                            [`@keyframes ${name}`]: { // Dynamically create the keyframe name
                                from: {
                                    backgroundPositionX: '0',
                                },
                                to: {
                                    backgroundPositionX: `-${width || 0}em / ${steps}}em`, // Calculate the position of the last frame
                                },
                            },
                        }}
                    />
                )} */}
                    </>
                ) : entity.type === "npc" ? (
                    <img
                        key={key}
                        src={imageSrc}
                        data-death={true}
                        alt={`${entity.name.replace('_', ' ')} is dead`}
                        data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)?.[0]}
                        data-type={entity.type}
                        data-entity-size={('size' in entity) ? entity.size : ''}
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
            {/* <img src="/assets/shadow.png" className={styles.shadow} /> */}
        </>
    );
}

export default BaseEntityDisplay;