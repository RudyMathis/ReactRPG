import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import { ShakeAtom } from "../../../atom/effects/ShakeAtom";
import { BaseDamageFlashAtom } from "../../../atom/effects/BaseDamageFlashAtom";
import "./BaseEntityDisplay.css"; 
import { useAtom } from "jotai";

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

// Map the entity names to image sources
const entityImages: Record<string, string> = {
    Warrior: '/assets/warrior.png',
    Mage: '/assets/mage.png', 
};

function BaseEntityDisplay({ entity }: CharacterDetailProps) {
    const [shakingEntities] = useAtom(ShakeAtom);
    const [flashEntities] = useAtom(BaseDamageFlashAtom);

    const imageSrc = entityImages[entity.name] || '/assets/default.png';

    const isShaking = shakingEntities[entity.id] ?? false;
    const isFlashing = flashEntities[entity.id] ?? false;
    const key = isShaking ? `${entity.id}-shaking` : (isFlashing ? `${entity.id}-flashing-shaking` : `${entity.id}`);
    
    return (
        <div className="sprite-container">
            <div key={key} 
                className={`sprite ${isShaking ? "shake" : ""} ${isFlashing ? "flash-red" : ""}`}>
                <img src={imageSrc} alt={entity.name} />
            </div>
        </div>
    );
}

export default BaseEntityDisplay;
