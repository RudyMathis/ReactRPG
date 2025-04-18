import { ElementType } from "../ElementTypes"; // make sure path is correct
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
    animation?: (casterId: string, targetId: string) => void;
    sound?: () => void;
    description?: string;
};
