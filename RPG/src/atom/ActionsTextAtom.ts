import { atom } from "jotai";
import { CharacterType } from "./CharacterAtom";
import { EnemyType } from "./BaseEnemyAtom";

export const actionsTextAtom = atom<
{ 
    entity: CharacterType | EnemyType, 
    action: string, 
    value: string, 
    target: CharacterType | EnemyType,
    isAttack: boolean,
    isDefense: boolean,
    isAoe: boolean,
    isBuff?: boolean,
}>();