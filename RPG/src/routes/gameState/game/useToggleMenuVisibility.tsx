import { useState } from 'react';

type EntityType = 'character' | 'enemy' | null;

export const useToggleMenu = () => {
    const [activeMenu, setActiveMenu] = useState<{ id: number | null; type: EntityType }>({
        id: null,
        type: null,
    });

    const toggleMenu = (id: number | null, type: EntityType) => {
        setActiveMenu(prev =>
            prev.id === id && prev.type === type
                ? { id: null, type: null }
                : { id, type }
        );
    };

    return { activeMenu, toggleMenu };
};