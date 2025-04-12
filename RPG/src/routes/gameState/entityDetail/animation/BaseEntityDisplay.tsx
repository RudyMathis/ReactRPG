import type { CharacterType } from "../../../../atom/CharacterAtom";
import type { EnemyType } from "../../../../atom/BaseEnemyAtom";
import { ShakeAtom } from "../../../../atom/effects/ShakeAtom";
import { BaseDamageFlashAtom } from "../../../../atom/effects/BaseDamageFlashAtom";
import "./BaseEntityDisplay.css"; 
import { useAtom } from "jotai";
import { DamageEffectAtom } from "../../../../atom/effects/DamageEffectAtom";

type EnityDetailProps = {
    entity: CharacterType | EnemyType;
};

const entityImages: Record<string, string> = {
    Warrior: '/assets/characters/warrior.png',
    Warrior_dead: '/assets/characters/warrior_dead.png',
    Mage: '/assets/characters/mage.png', 
    Mage_dead: '/assets/characters/mage_dead.png', 
    Cleric: '/assets/characters/cleric.png',
    Cleric_dead: '/assets/characters/cleric_dead.png',
    Rogue: '/assets/characters/rogue.png',
    Rogue_dead: '/assets/characters/rogue_dead.png',
    Archer: '/assets/characters/archer.png',
    Archer_dead: '/assets/characters/archer_dead.png',
    Goblin: '/assets/characters/goblin.png',
    Skeleton: '/assets/characters/skeleton.png',
    Zombie: '/assets/characters/zombie.png',
    Ghoul: '/assets/characters/ghoul.png',
    Ent: '/assets/characters/ent.png',
    Rat: '/assets/characters/rat.png',
    Wolf: '/assets/characters/wolf.png',
};

function BaseEntityDisplay({ entity }: EnityDetailProps) {
    const [shakingEntities] = useAtom(ShakeAtom);
    const [flashEntities] = useAtom(BaseDamageFlashAtom);
    const [damageEffectMap] = useAtom(DamageEffectAtom);
    const effectData = damageEffectMap[entity.id];

    const imageSrc = entityImages[entity.name] || entityImages[(entity as EnemyType).base] || '/assets/default.png';
    const imageSrcDead = entityImages[entity.name + '_dead'] || '/assets/default.png';

    const isShaking = shakingEntities[entity.id] ?? false;
    const isFlashing = flashEntities[entity.id] ?? false;
    const key = isShaking ? `${entity.id}-shaking` : (isFlashing ? `${entity.id}-flashing-shaking` : `${entity.id}`);

    
    return (
        <div className="sprite-container">
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

            <div key={key}
                data-entity-modified={(entity.name).match(/Fire|Ice|Dark/)}
                className={`sprite ${entity.type} ${isShaking ? "shake" : ""} ${isFlashing ? "flash-red" : ""}`}>
                {entity.health > 0 ? <img src={imageSrc} className={entity.type} alt={entity.name} /> : <img src={imageSrcDead} alt={`${entity.name} is dead`} />}
            </div>
        </div>
    );
}

export default BaseEntityDisplay;
