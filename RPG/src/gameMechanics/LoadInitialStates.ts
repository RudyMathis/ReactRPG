import EnemyAtom from "../atom/BaseEnemyAtom";
import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";
import { turnCountAtom } from "../atom/UseTurnCountAtom";

export const LoadInitialStates = () => {
    const savedCharacters = localStorage.getItem('characters');
    const savedEnemies = localStorage.getItem('enemies');
    const savedTurnCount = localStorage.getItem('turnCount');

    if (savedCharacters) {
        storeAtom.set(CharacterAtom, JSON.parse(savedCharacters));
    }
    if (savedEnemies) {
        storeAtom.set(EnemyAtom, JSON.parse(savedEnemies));
    }
    if (savedTurnCount) {
        storeAtom.set(turnCountAtom, parseInt(savedTurnCount, 10));
    }
};