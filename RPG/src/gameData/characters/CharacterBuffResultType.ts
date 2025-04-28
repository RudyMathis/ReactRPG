import { Buff } from "../Buffs";

type CharacterBuffResult =
    | number
    | { id: number; health: number }[]
    | { id: number; mana: number }
    | { id: number; buff: Buff }
    | { id: number; buff: Buff }[]
    | undefined;

export default CharacterBuffResult;