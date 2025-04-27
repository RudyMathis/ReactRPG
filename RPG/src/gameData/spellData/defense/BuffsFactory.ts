import HealChar20 from "./HealChar20";
import CureChar10 from "./CureChar10";
import HealAllChar40 from "./Heal_All_Char40";
import { CharacterType } from "../../../atom/CharacterAtom";
import MeditateChar30 from "./MeditateChar30";
import BerserkChar50 from "./BerserkChar50";
import { Buff } from "../../Buffs";
import { ElementTypes } from "../ElementTypes";
type BuffFunction = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
) => number | { id: string; health: number }[] | { id: string; mana: number } | { id: string; buff: Buff };

type BuffMeta = {
    func: BuffFunction;
    element: string;
    isSelfBuff: boolean;
};

const buffs: Record<string, BuffMeta> = {
    Heal__Char$20: { func: HealChar20, element: ElementTypes.Holy, isSelfBuff: false },
    Cure__Char$10: { func: CureChar10, element: ElementTypes.Holy, isSelfBuff: false },
    Heal_All_Char$40: { func: HealAllChar40, element: ElementTypes.Holy, isSelfBuff: false },
    Berserk__Char$50: { func: BerserkChar50, element: ElementTypes.Fire, isSelfBuff: true },
    'Meditate__Char$-30': { func: MeditateChar30, element: ElementTypes.Holy, isSelfBuff: true },
};

export default buffs;