import { ElementType } from "../ElementTypes";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";

export type AttackMeta = {
    element: ElementType;
    cost: number;
    func: (
        enemy: EnemyType,
        character: CharacterType,
        target: CharacterType | EnemyType,
        spellCost: number
    ) => number;
    animation?: string;
    sound?: () => void;
    description?: string;
};