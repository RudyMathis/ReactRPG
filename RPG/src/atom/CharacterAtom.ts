import { atom } from 'jotai';
import CharacterData from "../gameData/characters/CharacterData.json";

type Resistance = {
    type: string;
    value: number;
}

type vulnerability = {
    type: string;
    value: number;
}

type buffEffect = {
    name: string;
    type: string;
    duration: number;
    damage?: number;
};
type debuffEffect = {
    name: string;
    type: string;
    duration: number;
    damage?: number;
};

export type CharacterType = {
    id: number;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    defenseDefault: number;
    resistances: Resistance[];
    vulnerabilities: vulnerability[];
    speed: number;
    speedDefault: number;
    mana: number;
    maxMana: number;
    exp: number;
    maxExp: number;
    spells: string[];
    buffs: buffEffect[];
    debuffs: debuffEffect[];
    blessings: string[];
    currentTurn: boolean;
    isSelected: boolean;
    type: string;
    resource_type: string;
}

const CharacterAtom = atom<Record<number, CharacterType>>(
    Object.values(CharacterData).reduce((acc, char) => {
        acc[char.id] = char;
        return acc;
    }, {} as Record<number, CharacterType>)
);

export default CharacterAtom