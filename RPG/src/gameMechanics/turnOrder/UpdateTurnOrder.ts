import EnemyAtom from "../../atom/BaseEnemyAtom";
import CharacterAtom from "../../atom/CharacterAtom";
import { storeAtom } from "../../atom/storeAtom";

export const updatedTurnOder = () => {
    const characters = storeAtom.get(CharacterAtom);
    const enemies = storeAtom.get(EnemyAtom);
    const selectedCharacters = Object.values(characters).filter(char => char.isSelected);
    const allEntities = [...selectedCharacters, ...Object.values(enemies)];
    const turnOrder = allEntities.sort((a, b) => b.speed - a.speed);

    return turnOrder;
}