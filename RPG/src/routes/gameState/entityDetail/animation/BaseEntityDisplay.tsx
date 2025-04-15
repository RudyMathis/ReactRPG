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
    Archer: '/assets/characters/Archer_Attack.png',
    Cleric: '/assets/characters/Cleric_Attack.png',
    Knight: '/assets/characters/Knight_Attack.png',
    Mage: '/assets/characters/Mage_Attack.png', 
    Monk: '/assets/characters/Monk_Attack.png',
    Rogue: '/assets/characters/Rogue_Attack.png',
    Shaman: '/assets/characters/Shaman_Attack.png',
    Warrior: '/assets/characters/Warrior_Attack.png',
    Death_Knight: '/assets/enemies/Death_Knight.png',
    Ent: '/assets/enemies/Ent.png',
    Ettin: '/assets/enemies/Ettin.png',
    Goblin: '/assets/enemies/Goblin.png',
    Ghoul: '/assets/enemies/Ghoul.png',
    Manticore: '/assets/enemies/Manticore.png',
    Rat: '/assets/enemies/Rat.png',
    Skeleton: '/assets/enemies/Skeleton.png',
    Zombie: '/assets/enemies/Zombie.png',
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
                alt={entity.name.replace('_', ' ')} 
            /> 
            : 
            <img src={imageSrcDead} alt={`${entity.name.replace('_', ' ')} is dead`} />}
        </div>
    );
}

export default BaseEntityDisplay;
