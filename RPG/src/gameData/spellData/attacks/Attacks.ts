import { AttackMeta } from "./AttackMeta";
import { ElementTypes } from "../ElementTypes";

import DevastateTar60 from "./physical/DevastateTar60";
import FireBallTar20 from "./fire/FireBallTar20";
import FrostbiteTar20 from "./ice/FrostbiteTar20";
import GarroteTar40 from "./physical/GarroteTar40";
import HeroicStrikeTar20 from "./physical/HeroicStrikeTar20";
import IceBoltTar30 from "./ice/IceBoltTar30";
import LightningBoltTar40 from "./lightning/LightningBoltTar40";
import MultiShotTar$40 from "./physical/MultiShotTar40";
import ShadowStrikeTar0 from "./dark/ShadowStrikeTar0";
import QuickAttackTar0 from "./physical/QuickAttackTar0";
import ShootTar0 from "./physical/ShootTar0";
import AimShotTar50 from "./physical/AimShotTar50";
import VolleyTar20 from "./physical/VolleyTar20";
import ThunderclapTar40 from "./lightning/ThunderclapTar40";
import LeechTar10 from "./dark/LeechTar10";
import BackstabTar60 from "./physical/BackstabTar60";
import ShadowDaggerTar30 from "./dark/ShadowDaggerTar30";
import CleaveTar30 from "./physical/CleaveTar30";
import HolyExplosionTar50 from "./holy/HolyExplosionTar50";
import HolyStrikeTar40 from "./holy/HolyStrikeTar40";
import BurningSpiritsTar60 from "./fire/BurningSpiritsTar60";


const attacks: Record<string, AttackMeta> = {
    Fire_Ball_Tar$20: {
        name: 'Fire Ball',
        element: ElementTypes.Fire,
        cost: 20,
        aoe: false,
        func: FireBallTar20,
    },
    Burning_Spirits_Tar$60: {
        name: 'Burning Spirits',
        element: ElementTypes.Fire,
        cost: 60,
        aoe: true,
        func: BurningSpiritsTar60,
    },
    Ice_Bolt_Tar$30: {
        name: 'Ice Bolt',
        element: ElementTypes.Ice,
        cost: 30,
        aoe: false,
        func: IceBoltTar30,
    },
    Lightning_Bolt_Tar$40: {
        name: 'Lightning Bolt',
        element: ElementTypes.Lightning,
        cost: 40,
        aoe: false,
        func: LightningBoltTar40,
        animation: 'lightning',
    },
    Shadow_Strike_Tar$0: {
        name: 'Shadow Strike',
        element: ElementTypes.Dark,
        cost: 0,
        aoe: false,
        func: ShadowStrikeTar0,
    },
    Shadow_Dagger_Tar$30: {
        name: 'Shadow Dagger',
        element: ElementTypes.Dark,
        cost: 30,
        aoe: false,
        func: ShadowDaggerTar30,
    },
    'Heroic_Strike_Tar$-20': {
        name: 'Heroic Strike',
        element: ElementTypes.Physical,
        cost: -20,
        aoe: false,
        func: HeroicStrikeTar20,
        animation: 'sword',
    },
    'Leech__Tar$-10': {
        name: 'Leech',
        element: ElementTypes.Dark,
        cost: -10,
        aoe: false,
        func: LeechTar10,
    },
    Quick_Attack_Tar$0: {
        name: 'Quick Attack',
        element: ElementTypes.Physical,
        cost: 0,
        aoe: false,
        func: QuickAttackTar0,
        animation: 'quickAttack',
    },
    Garrote__Tar$40: {
        name: 'Garrote',
        element: ElementTypes.Physical,
        cost: 40,
        aoe: false,
        func: GarroteTar40,
    },
    Frostbite__Tar$20: {
        name: 'Frostbite',
        element: ElementTypes.Ice,
        cost: 20,
        aoe: false,
        func: FrostbiteTar20,
    },
    Devastate__Tar$60: {
        name: 'Devastate',
        element: ElementTypes.Physical,
        cost: 60,
        aoe: false,
        func: DevastateTar60,
    },
    Multi_Shot_Tar$40: {
        name: 'Multi Shot',
        element: ElementTypes.Physical,
        cost: 40,
        aoe: true,
        func: MultiShotTar$40,
    },
    Cleave__Tar$30: {
        name: 'Cleave',
        element: ElementTypes.Physical,
        cost: 30,
        aoe: true,
        func: CleaveTar30,
    },
    Shoot__Tar$0: {
        name: 'Shoot',
        element: ElementTypes.Physical,
        cost: 0,
        aoe: false,
        func: ShootTar0,
    },
    Aim_Shot_Tar$50: {
        name: 'Aim Shot',
        element: ElementTypes.Physical,
        cost: 50,
        aoe: false,
        func: AimShotTar50,
    },
    Volley__Tar$20: {
        name: 'Volley',
        element: ElementTypes.Physical,
        cost: 20,
        aoe: true,
        func: VolleyTar20,
    },
    Thunderclap__Tar$40: {
        name: 'Thunderclap',
        element: ElementTypes.Lightning,
        cost: 40,
        aoe: true,
        func: ThunderclapTar40,
        animation: 'lightning',
    },
    Backstab__Tar$60: {
        name: 'Backstab',
        element: ElementTypes.Physical,
        cost: 60,
        aoe: false,
        func: BackstabTar60,
    },
    Holy_Explosion_Tar$50: {
        name: 'Holy Explosion',
        element: ElementTypes.Holy,
        cost: 50,
        aoe: true,
        func: HolyExplosionTar50,
    },
    Holy_Strike_Tar$40: {
        name: 'Holy Strike',
        element: ElementTypes.Holy,
        cost: 40,
        aoe: false,
        func: HolyStrikeTar40,
    },
};

export default attacks;