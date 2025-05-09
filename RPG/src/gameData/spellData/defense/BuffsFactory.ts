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
    stat?: string;
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