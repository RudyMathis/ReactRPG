import { useState, useRef  } from "react";
import CharacterAtom from "../../atom/CharacterAtom";
import EnemyAtom from "../../atom/BaseEnemyAtom";
import './DetailScreen.css'

type CharacterType = (typeof CharacterAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;
type EnemyType = (typeof EnemyAtom) extends import('jotai').Atom<Record<number, infer T>> ? T : never;

type CharacterDetailProps = {
    entity: CharacterType | EnemyType;
};

const DetailScreen = ({ entity }: CharacterDetailProps) => {
    const [hidden, setHidden] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setHidden(false);
        }, 500);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHidden(true);
    };

    return (
        <>
            <div 
                className="trigger"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
            </div>

            {!hidden && (
                <div className="popup">
                    <h2>{entity.name}</h2>
                    <p>Level: {entity.level}</p>
                    <p>Health: {entity.health}</p>
                    <p>Max Health: {entity.maxHealth}</p>
                    <p>Attack: {entity.attack}</p>
                    <p>Defense: {entity.defense}</p>
                    <p>Speed: {entity.speed}</p>
                    <p>Mana: {entity.mana}</p>
                    <p>Max Mana: {entity.maxMana}</p>
                    <p>Luck: {entity.luck}</p>
                    {entity && 'exp' in entity && <p>Experience: {entity.exp}</p>}
                    {entity && 'maxExp' in entity && <p>Max Experience: {entity.maxExp}</p>}
                    {entity && 'gold' in entity && <p>Gold: {entity.gold}</p>}
                </div>
            )}
        </>
    );
};

export default DetailScreen;