import EnemyAtom from "../atom/BaseEnemyAtom";
import CharacterAtom from "../atom/CharacterAtom";
import { storeAtom } from "../atom/storeAtom";
import { turnCountAtom } from "../atom/UseTurnCountAtom";

export const SaveData = (currentEntityTurn?: number) => {
    const date = new Date();

    if (currentEntityTurn !== undefined) {
        localStorage.setItem('currentEntityTurn', currentEntityTurn.toString());
    }

    localStorage.setItem('characters', JSON.stringify(storeAtom.get(CharacterAtom)));
    localStorage.setItem('enemies', JSON.stringify(storeAtom.get(EnemyAtom)));
    localStorage.setItem('turnCount', JSON.stringify(storeAtom.get(turnCountAtom)));
    localStorage.setItem('Date', JSON.stringify(date.toLocaleDateString()));
};