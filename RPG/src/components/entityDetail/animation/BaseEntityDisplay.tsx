import type { CharacterType } from "../../../atom/CharacterAtom";
import type { EnemyType } from "../../../atom/BaseEnemyAtom";
import "./BaseEntityDisplay.css"; 

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

// Map the entity names to image sources
const entityImages: Record<string, string> = {
    Warrior: '/assets/warrior.png',
    Mage: '/assets/mage.png', 
};

function BaseEntityDisplay({ entity }: CharacterDetailProps) {
    const imageSrc = entityImages[entity.name] || '/assets/default.png';  // Fallback image if the name doesn't match
    
    return (
        <div className="sprite-container">
            <div className="sprite">
                <img src={imageSrc} alt={entity.name} />
            </div>
        </div>
    );
}

export default BaseEntityDisplay;
