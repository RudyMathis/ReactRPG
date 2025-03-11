import { atom } from 'jotai';
import { CharacterType } from "../routes/selectCharacter/CharacterType";
import CharacterData from "../routes/selectCharacter/CharacterData.json";

const CharacterAtom = atom<Record<number, CharacterType>>(
    Object.values(CharacterData).reduce((acc, char) => {
        acc[char.id] = char;
        return acc;
    }, {} as Record<number, CharacterType>)
);

export default CharacterAtom