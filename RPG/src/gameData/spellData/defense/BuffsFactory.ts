import HealChar20 from "./HealChar20";
import CureChar10 from "./CureChar10";
import HealAllChar40 from "./Heal_All_Char40";
import { CharacterType } from "../../../atom/CharacterAtom";
import MeditateChar30 from "./MeditateChar30";
import BerserkChar50 from "./BerserkChar50";
import { ElementTypes } from "../ElementTypes";
import DamageTotemChar30 from "./DamageTotemChar30";
import CharacterBuffResult from "../../characters/CharacterBuffResultType";
import TauntChar30 from "./TauntChar30";
import ProtectPartyChar50 from "./ProtectPartyChar50";
type BuffFunction = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
) => CharacterBuffResult;

type BuffMeta = {
    func: BuffFunction;
    element: string;
    isSelfBuff: boolean;
};

const buffs: Record<string, BuffMeta> = {
    Heal__Char$20: { func: HealChar20, element: ElementTypes.Holy, isSelfBuff: false },
    Cure__Char$10: { func: CureChar10, element: ElementTypes.Holy, isSelfBuff: false },
    Heal_All_Char$40: { func: HealAllChar40, element: ElementTypes.Holy, isSelfBuff: false },
    Damage_Totem_Char$30: { func: DamageTotemChar30, element: ElementTypes.Physical, isSelfBuff: false },
    Protect_Party_Char$50: { func: ProtectPartyChar50, element: ElementTypes.Physical, isSelfBuff: false },
    Berserk__Char$50: { func: BerserkChar50, element: ElementTypes.Fire, isSelfBuff: true },
    Taunt__Char$30: { func: TauntChar30, element: ElementTypes.Physical, isSelfBuff: true },
    'Meditate__Char$-30': { func: MeditateChar30, element: ElementTypes.Holy, isSelfBuff: true },
};

export default buffs;