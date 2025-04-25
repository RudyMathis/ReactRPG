import HealChar20 from "./HealChar20";
import CureChar10 from "./CureChar10";
import HealAllChar40 from "./Heal_All_Char40";
import { CharacterType } from "../../../atom/CharacterAtom";
import MeditateChar30 from "./MeditateChar30";
import BerserkChar50 from "./BerserkChar50";
import { Buff } from "../../Buffs";

type BuffFunction = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
) => number | { id: string; health: number }[] | { id: string; mana: number } | { id: string; buff: Buff };

const buffs: Record<string, BuffFunction> = {
    Heal__Char$20: HealChar20,
    Cure__Char$10: CureChar10,
    Heal_All_Char$40: HealAllChar40,
    Berserk__Char$50: BerserkChar50,
    'Meditate__Char$-30': MeditateChar30,
};

export default buffs;