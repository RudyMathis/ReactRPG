const characterPath = '/assets/characters/attacks/';
const characterDeathPath = '/assets/characters/deaths/';
const enemyPath = '/assets/enemies/';

const characterTypes = ['Archer', 'Cleric', 'Knight', 'Mage', 'Monk', 'Rogue', 'Shaman', 'Warrior'] as const;
const enemyTypes = ['Death_Knight', 'Ent', 'Ettin', 'Goblin', 'Ghoul', 'Manticore', 'Rat', 'Skeleton', 'Zombie'] as const;

export const EntityImages = {
    ...characterTypes.reduce((acc, type) => ({
        ...acc,
        [type]: `${characterPath}${type}_Attack.png`,
        [`${type}_Death`]: `${characterDeathPath}${type}_Death.png`,
    }), {}),
    ...enemyTypes.reduce((acc, type) => ({
        ...acc,
        [type]: `${enemyPath}${type}.png`,
    }), {}),
} as const;
