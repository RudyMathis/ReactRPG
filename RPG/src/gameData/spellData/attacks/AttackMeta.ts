import { ElementType } from "../ElementTypes";
import { EnemyType } from "../../../atom/BaseEnemyAtom";
import { CharacterType } from "../../../atom/CharacterAtom";

export type AttackMeta = {
    name: string;
    element: ElementType;
    cost: number;
    func: (
        enemy: EnemyType,
        character: CharacterType,
        target: CharacterType | EnemyType,
        spellCost: number
    ) => number;
    aoe: boolean;
    animation?: string;
    sound?: () => void;
    description?: string;
};