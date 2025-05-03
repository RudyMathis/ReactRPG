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
    animation?: {
        name: string;
        duration: number;
        width: number;
        height: number;
        steps: number;
        image: string;
        rotation?: number;
        brightness?: number;
    }
    sound?: () => void;
    description?: string;
};