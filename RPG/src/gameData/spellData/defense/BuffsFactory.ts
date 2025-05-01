import HealChar20 from "./HealChar20";
import CureChar10 from "./CureChar10";
import HealAllChar40 from "./HealAllChar40";
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
    name: string;
    buffName?: string;
    func: BuffFunction;
    element: string;
    isSelfBuff: boolean;
    isAoe: boolean;
    isBuff: boolean;
};

const buffs: Record<string, BuffMeta> = {
    Heal__Char$20: { 
        name: 'Heal',
        func: HealChar20, 
        element: ElementTypes.Holy, 
        isSelfBuff: false, 
        isAoe: false,
        isBuff: false,
    },
    Cure__Char$10: { 
        name: 'Cure',
        func: CureChar10, 
        element: ElementTypes.Holy, 
        isSelfBuff: false,
        isAoe: false,
        isBuff: false,
    },
    Heal_All_Char$40: { 
        name: 'Heal All',
        func: HealAllChar40, 
        element: ElementTypes.Holy, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: false,
    },
    Damage_Totem_Char$30: { 
        name: 'Damage Totem',
        buffName: 'Damage Totem',
        func: DamageTotemChar30, 
        element: ElementTypes.Physical, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: true,
    },
    Protect_Party_Char$50: { 
        name: 'Protect Party',
        buffName: 'Protected',
        func: ProtectPartyChar50, 
        element: ElementTypes.Physical, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: true,
    },
    Berserk__Char$50: { 
        name: 'Berserk',
        buffName: 'Berserk',
        func: BerserkChar50, 
        element: ElementTypes.Fire, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: true,
    },
    Taunt__Char$30: { 
        name: 'Taunt',
        buffName: 'Taunter',
        func: TauntChar30, 
        element: ElementTypes.Physical, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: true,
    },
    'Meditate__Char$-30': { 
        name: 'Meditate',
        func: MeditateChar30, 
        element: ElementTypes.Holy, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: false,
    },
};

export default buffs;