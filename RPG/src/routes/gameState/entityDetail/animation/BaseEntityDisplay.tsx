import type { CharacterType } from "../../../../atom/CharacterAtom";
import type { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { AttackAnimationAtom } from "../../../../atom/effects/AttackAnimationAtom";
import { BaseDamageFlashAtom } from "../../../../atom/effects/BaseDamageFlashAtom";
import "./BaseEntityDisplay.css"; 
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../../atom/effects/DamageEffectAtom";

type EnityDetailProps = {
    entity: CharacterType | EnemyType;
};

const entityImages: Record<string, string> = {
    Warrior: '/assets/characters/Warrior_Attack.png',
    // Warrior_dead: '/assets/characters/warrior_dead.png',
    Mage: '/assets/characters/Mage_Attack.png', 
    // Mage_dead: '/assets/characters/mage_dead.png', 
    Cleric: '/assets/characters/Cleric_Attack.png',
    // Cleric_dead: '/assets/characters/cleric_dead.png',
    Rogue: '/assets/characters/Rogue_Attack.png',
    // Rogue_dead: '/assets/characters/rogue_dead.png',
    Archer: '/assets/characters/Archer_Attack.png',
    // Archer_dead: '/assets/characters/archer_dead.png',
    Goblin: '/assets/characters/Goblin.png',
    Skeleton: '/assets/characters/Skeleton.png',
    Zombie: '/assets/characters/Zombie.png',
    Ghoul: '/assets/characters/Ghoul.png',
    Ent: '/assets/characters/Ent.png',
    Rat: '/assets/characters/Rat.png',
    Wolf: '/assets/characters/Wolf.png',
    Monk: '/assets/characters/Monk_Attack.png',
    Shaman: '/assets/characters/Shaman_Attack.png',
};

function BaseEntityDisplay({ entity }: EnityDetailProps) {
    const [attackingEntities] = useAtom(AttackAnimationAtom);
    const [flashEntities] = useAtom(BaseDamageFlashAtom);
    const [damageEffectMap] = useAtom(DamageEffectAtom);
    const effectData = damageEffectMap[entity.id];

    const imageSrc = entityImages[entity.name] || entityImages[(entity as EnemyType).base] || '/assets/default.png';
    const imageSrcDead = entityImages[entity.name + '_dead'] || '/assets/default.png';

    const isAttacking = attackingEntities[entity.id] ?? false;
    const isFlashing = flashEntities[entity.id] ?? false;
    const key = isAttacking ? `${entity.id}-attacking` : (isFlashing ? `${entity.id}-flashing-attacking` : `${entity.id}`);

    
    return (
        <div className={`sprite-container ${entity.type}${isAttacking ? " attack-move" : ""}`}>

            {
                effectData?.isDisplay &&
                entity.type === effectData.target && (
                    <div>
                        {effectData.effects.map((e, i) => (
                            <div key={i} className="damage-line">
                                <span
                                    className={`damage-effect ${entity.type}`}
                                    data-damage-type={e.type}
                                    style={{
                                        animationDelay: `${i * 1}s`,
                                        animation: 'floatUp 1s ease-out forwards',
                                        left: `${Math.random() * 10 - 5}px`,
                                        top: `${Math.random() * 10 - 5}px`,
                                    }}
                                >
                                    {e.damage}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            }
            {entity.health > 0 ? <img 
                key={key} src={imageSrc}
                data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                className={`sprite ${entity.type} ${entity.name}${isAttacking ? " attack" : ""} ${isFlashing ? "flash-red" : ""}`}
                alt={entity.name} 
            /> 
            : 
            <img src={imageSrcDead} alt={`${entity.name} is dead`} />}

        </div>
    );
}

export default BaseEntityDisplay;
