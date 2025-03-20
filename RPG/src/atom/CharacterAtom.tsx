import { atom } from 'jotai';
import CharacterData from "../gameData/characters/CharacterData.json";

type StatusEffect = {
    type: string; // e.g., "Frozen"
    duration: number; // Number of turns remaining
};

export type CharacterType = {
    id: number;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    speed: number;
    mana: number;
    maxMana: number;
    luck: number;
    exp: number;
    maxExp: number;
    gold: number;
    items: string[];
    spells: string[];
    status: StatusEffect[];
    currentTurn: boolean;
    isSelected: boolean;
}

const CharacterAtom = atom<Record<number, CharacterType>>(
    Object.values(CharacterData).reduce((acc, char) => {
        acc[char.id] = char;
        return acc;
    }, {} as Record<number, CharacterType>)
);

export default CharacterAtom