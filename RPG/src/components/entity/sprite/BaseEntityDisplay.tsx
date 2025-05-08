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
import { DefenseAnimationAtom } from "../../../atom/effects/DefenseAnimationAtom";

type EnityDetailProps = {
    entity: CharacterType | EnemyType;
};

function BaseEntityDisplay({ entity }: EnityDetailProps) {
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const [defendEntities] = useAtom(DefenseAnimationAtom);
    const [flashEntities] = useAtom(FlashAnimationAtom);
    const [damageEffectMap] = useAtom(DamageEffectAtom);
    const effectData = damageEffectMap[entity.id];

    const imageSrc = EntityImages[entity.name] || EntityImages[(entity as EnemyType).base] || '/assets/default.png';
    const imageSrcDead = EntityImages[entity.name + '_Death'] || '/assets/default.png';

    const isAttacking = !!attackingEntities[entity.id];
    const isDefending = !!defendEntities[entity.id];
    const isFlashing = !!flashEntities[entity.id];
    const isTakingDamage = !!(effectData?.isDisplay && entity.type === effectData.target);
    const shouldFlash = isFlashing || isTakingDamage;

    const key = isAttacking ? `${entity.id}-attacking` : isDefending ? `${entity.id}-defending` : (isFlashing ? `${entity.id}-flashing-attacking` : `${entity.id}`);
    
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
    const attackTop = attackEntry?.animation?.top;
    const attackLeft = attackEntry?.animation?.left;
    
    const defendEntry = Object.values(buffs).find(
        (buff) => buff.animation?.name === activeAnimation
    );

    const defendName = defendEntry?.animation?.name;
    const defendDuration = defendEntry?.animation?.duration;
    const defendSteps = defendEntry?.animation?.steps;
    const defendWidth = defendEntry?.animation?.width;
    const defendHeight = defendEntry?.animation?.height;
    const defendImage = defendEntry?.animation?.image;
    const defendRotation = defendEntry?.animation?.rotation;
    const defendBrightness = defendEntry?.animation?.brightness;
    const defendTop = defendEntry?.animation?.top;
    const defendLeft = defendEntry?.animation?.left;

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
                        top: `${attackTop}%`,
                        left: `${attackLeft}%`,
                        animation:`${styles[attackName || '']} ${attackDuration}ms steps(${attackSteps}) forwards`,
                        filter: `hue-rotate(${attackRotation}deg) brightness(${attackBrightness})`,
                    }}
                />
            )}
            {activeAnimation && defendEntry?.animation && (
                <div
                    key={`${entity.id}-animation-${activeAnimation}`}
                    className={styles.spellAnimation}
                    style={{
                        backgroundSize: `${defendWidth}em ${defendHeight}em`,
                        width: `calc(${defendWidth}em / ${defendSteps})`,
                        height: `${defendHeight}em`,
                        backgroundImage: `url(${defendImage})`,
                        top: `${defendTop}px`,
                        left: `${defendLeft}px`,
                        animation: `${styles[defendName || '']} ${defendDuration}ms steps(${defendSteps}) forwards`,
                        filter: `hue-rotate(${defendRotation}deg) brightness(${defendBrightness})`,
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
            <div className={styles.spriteGlow} data-entity-size={('size' in entity) ? entity.size : ''}></div> 
            {/* <div className={styles.spriteContainer} data-type={entity.type} {entity.health > 0 ? '' : 'data-death = true'}> */}
            <div className={styles.spriteContainer} data-type={entity.type} {...(entity.health <= 0 ? { 'data-death': true } : {})}>
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
                                ${isDefending ? styles.defend : ""}
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