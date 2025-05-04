import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import { AttackAnimationAtom } from "../../../atom/effects/AttackAnimationAtom";
import { FlashAnimationAtom } from "../../../atom/effects/FlashAnimationAtom";
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../atom/effects/DamageEffectAtom";
import { EntityImages } from "./EntityImages";
import styles from './BaseEntityDisplay.module.css';
import attacks from "../../../gameData/spellData/attacks/Attacks";
import buffs from "../../../gameData/spellData/defense/BuffsFactory";

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
    
    const attackName = attackEntry?.animation?.name;
    const attackDuration = attackEntry?.animation?.duration;
    const attackSteps = attackEntry?.animation?.steps;
    const attackWidth = attackEntry?.animation?.width;
    const attackHeight = attackEntry?.animation?.height;
    const attackImage = attackEntry?.animation?.image;
    const attackRotation = attackEntry?.animation?.rotation;
    const attackBrightness = attackEntry?.animation?.brightness;
    
    const denfenseEntry = Object.values(buffs).find(
        (buff) => buff.animation?.name === activeAnimation
    );

    const defenseName = denfenseEntry?.animation?.name;
    const defenseDuration = denfenseEntry?.animation?.duration;
    const defenseSteps = denfenseEntry?.animation?.steps;
    const defenseWidth = denfenseEntry?.animation?.width;
    const defenseHeight = denfenseEntry?.animation?.height;
    const defenseImage = denfenseEntry?.animation?.image;
    const defenseRotation = denfenseEntry?.animation?.rotation;
    const defenseBrightness = denfenseEntry?.animation?.brightness;

    return (
        <>
            {activeAnimation && attackEntry?.animation && (
                <div
                    key={`${entity.id}-animation-${activeAnimation}`}
                    className={styles.spellAnimation}
                    style={{
                        backgroundSize: `${attackWidth}em ${attackHeight}em`,
                        width: `calc(${attackWidth}em / ${attackSteps})`,
                        height: `${attackHeight}em`,
                        backgroundImage: `url(${attackImage})`,
                        animation:`${styles[attackName || '']} ${attackDuration}ms steps(${attackSteps}) forwards`,
                        filter: `hue-rotate(${attackRotation}deg) brightness(${attackBrightness})`,
                    }}
                />
            )}
            {activeAnimation && denfenseEntry?.animation && (
                <div
                    key={`${entity.id}-animation-${activeAnimation}`}
                    className={styles.spellAnimation}
                    style={{
                        backgroundSize: `${defenseWidth}em ${defenseHeight}em`,
                        width: `calc(${defenseWidth}em / ${defenseSteps})`,
                        height: `${defenseHeight}em`,
                        backgroundImage: `url(${defenseImage})`,
                        animation: `${styles[defenseName || '']} ${defenseDuration}ms steps(${defenseSteps}) forwards`,
                        filter: `hue-rotate(${defenseRotation}deg) brightness(${defenseBrightness})`,
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
        </>
    );
}

export default BaseEntityDisplay;