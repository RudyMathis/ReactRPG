import { CharacterType } from "../../../atom/CharacterAtom";
import { ElementTypes } from "../ElementTypes";
import CharacterBuffResult from "../../characters/CharacterBuffResultType";

import HealChar20 from "./HealChar20";
import { spellCost as HealChar20Cost , stat as HealChar20Stat, statValue as HealChar20StatValue } from "./HealChar20";

import CureChar10 from "./CureChar10";
import { spellCost as CureChar10Cost , isMoreInfo as CureChar10isMoreInfo, additionalInfo as CureChar10additionalInfo } from "./CureChar10";

import HealAllChar40 from "./HealAllChar40";
import { spellCost as HealAllChar40Cost , stat as HealAllChar40Stat, statValue as HealAllChar40StatValue } from "./HealAllChar40";

import MeditateChar30 from "./MeditateChar30";
import { spellCost as MeditateChar30Cost , stat as MeditateChar30Stat, statValue as MeditateChar30StatValue } from "./MeditateChar30";

import BerserkChar50 from "./BerserkChar50";
import { spellCost as BerserkChar50Cost , isMoreInfo as BerserkChar50isMoreInfo, additionalInfo as BerserkChar50additionalInfo } from "./BerserkChar50";

import DamageTotemChar30 from "./DamageTotemChar30";
import { spellCost as DamageTotemChar30Cost , isMoreInfo as DamageTotemChar30isMoreInfo, additionalInfo as DamageTotemChar30additionalInfo } from "./DamageTotemChar30";

import TauntChar30 from "./TauntChar30";
import { spellCost as TauntChar30Cost , isMoreInfo as TauntChar30isMoreInfo, additionalInfo as TauntChar30additionalInfo } from "./TauntChar30";

import ProtectPartyChar50 from "./ProtectPartyChar50";
import { spellCost as ProtectPartyChar50Cost , isMoreInfo as ProtectPartyChar50isMoreInfo, additionalInfo as ProtectPartyChar50additionalInfo } from "./ProtectPartyChar50";

type BuffFunction = (
    character: CharacterType,
    target: CharacterType,
    spellCost: number
) => CharacterBuffResult;

type BuffMeta = {
    name: string;
    buffName?: string;
    cost: number;
    stat?: string;
    isMoreInfo?: boolean;
    additionalInfo?: string;
    statValue?: number;
    func: BuffFunction;
    element: string;
    isSelfBuff: boolean;
    isAoe: boolean;
    isBuff: boolean;
    isMana?: boolean;
    animation: {
        name: string;
        duration: number;
        width: number;
        height: number;
        steps: number;
        image: string;
        rotation?: number;
        brightness?: number;
        top?: number;
        left?: number;
    }
};
const imagePath = '/assets/vfx/spell_';

const buffs: Record<string, BuffMeta> = {
    Heal__Char$20: { 
        name: 'Heal',
        cost: HealChar20Cost,
        stat: HealChar20Stat,
        statValue: HealChar20StatValue,
        func: HealChar20, 
        element: ElementTypes.Holy, 
        isSelfBuff: false, 
        isAoe: false,
        isBuff: false,
        animation: {
            name: 'heal',
            duration: 900,
            width: 36,
            height: 10.28,
            steps: 3,
            image: `${imagePath}heal.png`,
            rotation: -90,
            brightness: 1.5,
        },
    },
    Cure__Char$10: { 
        name: 'Cure',
        cost: CureChar10Cost,
        isMoreInfo: CureChar10isMoreInfo,
        additionalInfo: CureChar10additionalInfo,
        func: CureChar10, 
        element: ElementTypes.Holy, 
        isSelfBuff: false,
        isAoe: false,
        isBuff: false,
        animation: {
            name: 'cure',
            duration: 900,
            width: 15,
            height: 6.85,
            steps: 4,
            image: `${imagePath}cure.png`,
        },
    },
    Heal_All_Char$40: { 
        name: 'Heal All',
        cost: HealAllChar40Cost,
        stat: HealAllChar40Stat,
        statValue: HealAllChar40StatValue,
        func: HealAllChar40, 
        element: ElementTypes.Holy, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: false,
        animation: {
            name: 'healAll',
            duration: 900,
            width: 36,
            height: 10.28,
            steps: 3,
            image: `${imagePath}heal.png`,
            rotation: -90,
            brightness: 1.5,
        },
    },
    Damage_Totem_Char$30: { 
        name: 'Damage Totem',
        buffName: 'Damage Totem',
        cost: DamageTotemChar30Cost,
        isMoreInfo: DamageTotemChar30isMoreInfo,
        additionalInfo: DamageTotemChar30additionalInfo,
        func: DamageTotemChar30, 
        element: ElementTypes.Physical, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: true,
        animation: {
            name: 'meditate',
            duration: 900,
            width: 15,
            height: 3.43,
            steps: 4,
            image: `${imagePath}meditate.png`,
            rotation: -90,
            brightness: 1.5,
        },
    },
    Protect_Party_Char$50: { 
        name: 'Protect Party',
        buffName: 'Protected',
        cost: ProtectPartyChar50Cost,
        isMoreInfo: ProtectPartyChar50isMoreInfo,
        additionalInfo: ProtectPartyChar50additionalInfo,
        func: ProtectPartyChar50, 
        element: ElementTypes.Physical, 
        isSelfBuff: false,
        isAoe: true,
        isBuff: true,
        animation: {
            name: 'protect',
            duration: 900,
            width: 15,
            height: 3,
            steps: 4,
            image: `${imagePath}protect.png`,
        },
    },
    Berserk__Char$50: { 
        name: 'Berserk',
        buffName: 'Berserk',
        cost: BerserkChar50Cost,
        isMoreInfo: BerserkChar50isMoreInfo,
        additionalInfo: BerserkChar50additionalInfo,
        func: BerserkChar50, 
        element: ElementTypes.Fire, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: true,
        animation: {
            name: 'berserk',
            duration: 900,
            width: 18,
            height: 6.43,
            steps: 2,
            image: `${imagePath}berserk.png`,
        },
    },
    Taunt__Char$30: { 
        name: 'Taunt',
        buffName: 'Taunter',
        cost: TauntChar30Cost,
        isMoreInfo: TauntChar30isMoreInfo,
        additionalInfo: TauntChar30additionalInfo,
        func: TauntChar30, 
        element: ElementTypes.Physical, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: true,
        animation: {
            name: 'taunt',
            duration: 900,
            width: 9,
            height: 6.86,
            steps: 2,
            image: `${imagePath}taunt.png`,
            left: 50,
        },
    },
    'Meditate__Char$-30': { 
        name: 'Meditate',
        cost: MeditateChar30Cost,
        stat: MeditateChar30Stat,
        statValue: MeditateChar30StatValue,
        func: MeditateChar30, 
        element: ElementTypes.Holy, 
        isSelfBuff: true,
        isAoe: false,
        isBuff: false,
        isMana: true,
        animation: {
            name: 'meditate',
            duration: 900,
            width: 15,
            height: 3.43,
            steps: 4,
            image: `${imagePath}meditate.png`,
        },
    },
};

export default buffs;